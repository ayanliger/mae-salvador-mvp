# Caderneta da Gestante Digital: pesquisa técnica para Salvador

**A solução digital para acompanhamento pré-natal em Salvador é tecnicamente viável e estrategicamente oportuna.** O ecossistema de saúde digital do SUS — com a RNDS operando em FHIR R4, o e-SUS APS cobrindo 85% das unidades básicas do país, e a integração de Bahia já ativa na rede nacional — fornece a infraestrutura de interoperabilidade necessária. Salvador possui **162 unidades de saúde, 389 equipes de Saúde da Família e o Programa Mãe Salvador com 32 mil gestantes cadastradas**, criando uma base de usuários imediata. Não existe caderneta digital oficial no Brasil — o Ministério da Saúde distribui **3 milhões de cadernetas em papel por ano** a um custo de R$ 5,7 milhões. Esta pesquisa apresenta a arquitetura completa, integrações com sistemas do SUS e stack tecnológico recomendado para os dois produtos: app mobile React Native e dashboard web para profissionais.

---

## PARTE 1 — FRONTEND

### O app mobile exige design offline-first e acessibilidade radical

O app React Native para gestantes opera em um contexto onde muitas UBS de Salvador têm conectividade limitada, e as usuárias apresentam letramento digital variado. A arquitetura offline-first não é opcional — é requisito de infraestrutura.

**Stack recomendado para o app mobile:**

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Framework | React Native + Expo (SDK 54+) | Cross-platform, ecossistema maduro, Brasil é o 3º maior mercado de devs RN |
| UI Components | **Gluestack UI v3** + NativeWind | Componentes universais (mobile + web), ~150KB, acessibilidade via React Native ARIA, Tailwind CSS |
| Banco local | **WatermelonDB** (SQLite) | Queries em thread nativa separada, sync engine pull-push embutido, suporta dezenas de milhares de registros |
| Storage seguro | react-native-mmkv (criptografado) | Ultra-rápido para tokens e preferências; expo-secure-store para credenciais OAuth |
| Autenticação biométrica | expo-local-authentication | Face ID, Touch ID, fingerprint; fallback para PIN/senha |
| Notificações | expo-notifications | Lembretes locais (sem internet) + push remoto via FCM/APNs |
| State management | Zustand (client) + TanStack React Query (server) | Leve, TypeScript nativo, cache inteligente de requests |
| Formulários | React Hook Form + Zod | Validação tipada compartilhável com backend e dashboard |
| Navegação | expo-router (file-based) | Convenção over configuração, deep linking nativo |

O padrão de sincronização segue o fluxo: **WatermelonDB (SQLite local) ↔ Sync Engine ↔ Backend API + PostgreSQL**. Quando a gestante registra dados offline (peso, pressão, sintomas), os registros são armazenados localmente e sincronizados automaticamente quando a conectividade retorna. O WatermelonDB é reativo — componentes re-renderizam automaticamente quando dados mudam.

Para **acessibilidade**, o app deve seguir WCAG 2.1 Nível AA com adaptações específicas: touch targets mínimos de **48×48dp**, fontes mínimas de 16px (sans-serif como Inter ou Noto Sans), contraste mínimo de **4.5:1**, navegação com máximo 3-4 itens no tab bar inferior, ícones sempre acompanhados de texto, linguagem simplificada (ex: "pressão alta" em vez de "hipertensão arterial gestacional"), e progressive disclosure — mostrar apenas informações essenciais primeiro, detalhes sob demanda. A cor nunca deve ser o único indicador; alertas vermelhos sempre devem incluir ícone e texto.

### O dashboard web combina Next.js com visualizações clínicas especializadas

Para o dashboard de profissionais de saúde, **Next.js 15+ com App Router** é a escolha recomendada, combinado com **Shadcn/UI + Tailwind CSS** para componentes e **Recharts** para gráficos clínicos.

**Stack recomendado para o dashboard:**

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Framework | Next.js 15+ (App Router) | SSR para carregamento rápido em computadores de UBS, API routes para BFF |
| Componentes UI | **Shadcn/UI** + Radix UI + Tailwind CSS v4 | Copy-paste (sem vendor lock-in), acessibilidade built-in, dark/light mode |
| Gráficos | **Recharts** (primário) + Tremor (KPIs) | Declarativo, baseado em D3, pré-estilizado para dashboards |
| Tabelas | **TanStack Table v8** | Headless, paginação server-side, TypeScript, virtual scrolling |
| Formulários | React Hook Form + Zod | Mesmo esquema de validação compartilhado com o app mobile |
| Autenticação | NextAuth.js (Auth.js) | Provider customizado para gov.br; suporte a RBAC |

Os gráficos clínicos essenciais incluem: curva de peso gestacional (LineChart), tendências de pressão arterial com faixas de referência (LineChart com bandas), evolução da altura uterina (AreaChart), percentual de completude do calendário vacinal (TrackerChart), adesão às consultas pré-natal (DonutChart) e distribuição por classificação de risco (PieChart). O dashboard também precisa de indicadores alinhados ao **Previne Brasil**: percentual de gestantes com início precoce do pré-natal (≤12 semanas), percentual com 7+ consultas, cobertura vacinal dTpa/influenza e taxa de exames no 1º trimestre.

### Autenticação gov.br opera via OAuth 2.0 + PKCE com navegador nativo

A integração com o **Login Único gov.br** segue o protocolo OAuth 2.0 + OpenID Connect com **PKCE obrigatório** (RFC 7636). Os endpoints de produção são `https://sso.acesso.gov.br/authorize` (autorização), `/token` (troca de código) e `/userinfo` (dados do cidadão).

A documentação do gov.br **proíbe explicitamente** o uso de WebView no mobile — deve-se usar navegador nativo. No React Native/Expo, a implementação correta usa `expo-auth-session` com `expo-web-browser`, que abre o navegador do sistema para o fluxo OAuth e retorna ao app via custom URI scheme (`caderneta-gestante://callback`).

O gov.br possui três **níveis de confiabilidade**: Bronze (CPF + formulário online), **Prata** (reconhecimento facial via CNH ou validação bancária) e Ouro (biometria da Justiça Eleitoral ou certificado ICP-Brasil). Para acesso a dados de saúde, recomenda-se exigir **nível mínimo Prata**. O token ID retorna CPF, nome, email, telefone e nível de confiabilidade — dados suficientes para vincular a gestante ao seu registro no CNS/CADSUS.

Para **profissionais de saúde** no dashboard, a autenticação combina gov.br (nível Prata mínimo) com verificação de vínculo ativo no **CNES** (Cadastro Nacional de Estabelecimentos de Saúde). O profissional deve ter CPF vinculado a um estabelecimento CNES com CBO (Classificação Brasileira de Ocupações) compatível. O fluxo: login via gov.br → consulta CNES para validar vínculo profissional → autorização RBAC baseada no papel (enfermeiro, médico, gestor).

O pacote npm `govbr-oauth` fornece uma SDK Node.js para o backend, útil para troca de tokens no servidor. Os pré-requisitos para integração incluem: solicitar credenciais no portal gov.br, registrar redirect URIs, usar o botão oficial "Entrar com GOV.BR" (disponível no Design System gov.br) e implementar validação obrigatória do parâmetro `state`.

---

## PARTE 2 — BACKEND E INTEGRAÇÃO COM SISTEMAS DO SUS

### A RNDS é o barramento central de interoperabilidade e opera em FHIR R4

A **Rede Nacional de Dados em Saúde (RNDS)** é a plataforma nacional de interoperabilidade do SUS, formalizada por decreto presidencial em julho de 2025. Opera com **2,8+ bilhões de registros clínicos**, cobre **21 estados + DF** (incluindo Bahia) e **3.805 municípios** (68,3%). É o **alvo primário de integração** para qualquer sistema que deseje trocar dados de saúde nacionalmente.

A RNDS utiliza **HL7 FHIR R4** (Fast Healthcare Interoperability Resources) como padrão obrigatório. O Implementation Guide oficial está em `https://rnds-fhir.saude.gov.br/` (pacote `rnds#1.0.0`, baseado em FHIR 4.0.1), e os perfis estão publicados no Simplifier em `https://simplifier.net/RedeNacionaldeDadosemSaude` — são **40 perfis FHIR, 72 CodeSystems e 93 ValueSets**.

**Endpoints FHIR disponíveis na RNDS:**

| Endpoint | Recurso FHIR | Uso na Caderneta |
|----------|-------------|-----------------|
| `/fhir/r4/Patient` | Patient (BRIndividuo) | Busca gestante por CNS ou CPF |
| `/fhir/r4/Organization` | Organization | Busca estabelecimento CNES |
| `/fhir/r4/Practitioner` | Practitioner | Busca profissional de saúde |
| `/fhir/r4/Bundle` | Bundle (composições) | Submeter/recuperar documentos clínicos |
| `/contexto-atendimento` | — | Acesso à timeline clínica do paciente |

Os **portfólios de serviço** relevantes para a caderneta são: **CNS** (identidade do paciente), **RAC** (Registro de Atendimento Clínico — consultas pré-natal), **RIA** (Registro de Imunobiológico — vacinas), **REL** (Resultados de Exames Laboratoriais) e **e-SUS APS** (integração com PEC).

A autenticação RNDS usa **mutual TLS (2-Way SSL)** com certificados digitais **ICP-Brasil** (e-CNPJ ou e-CPF, tipo A1 ou A3). O fluxo: POST para `ehr-auth.saude.gov.br` com certificado digital → recebe `access_token` (válido por 15 minutos) → usa token como Bearer em todas as chamadas FHIR para `ehr-services.saude.gov.br`. Em produção, cada estado possui URL específica de EHR Services. O credenciamento é feito via **Portal de Serviços DATASUS** (`servicos-datasus.saude.gov.br`).

### O e-SUS APS oferece três caminhos de integração com dados pré-natais

O **e-SUS APS/PEC** é o sistema onde os dados de pré-natal são efetivamente registrados nas UBS. O PEC possui módulo de pré-natal que rastreia DUM, data provável do parto, idade gestacional, classificação de risco, consultas, exames laboratoriais, testes rápidos, vacinação, tipo de parto e consultas puerperais.

Existem **três caminhos de integração**:

**1. LEDI APS (Layout e-SUS de Dados e Interface)** — usa Apache Thrift ou XML para enviar dados **para** o PEC (direção única: write-only). O formato é binário `.esus` com TBinaryProtocol. Suporta linguagens C#, Delphi, Go, Java, PHP, Python, Node.js e Ruby. A documentação está em `https://integracao.esusab.ufsc.br/` e o repositório GitHub em `https://github.com/laboratoriobridge/esusab-integracao`. Versão atual: LEDI APS v4.1.2, compatível com PEC v4.1.7+.

**2. LEDI API (REST)** — disponível desde PEC v5.3.19 (novembro 2024). Nova API REST para enviar registros LEDI diretamente ao PEC. Autenticação via POST para `[url_instalacao]/api/recebimento/login` com usuário/senha → retorna JSESSIONID. Submissão via POST para `/api/v1/recebimento/ficha` com arquivo binário serializado. Documentação oficial: `https://sisaps.saude.gov.br/sistemas/esusaps/docs/manual/APOIO/API_transmissao/`.

**3. DW PEC (Data Warehouse)** — acesso direto ao banco PostgreSQL do PEC para **leitura** de dados. Queries SQL contra o Data Warehouse da instalação PEC local. Documentação: `https://integracao.esusab.ufsc.br/dw/index.html`. **Este é o caminho mais viável para extrair dados de pré-natal existentes** — registros de consultas, observações clínicas, resultados de exames.

Para a Caderneta da Gestante Digital, a estratégia recomendada é: **ler dados via DW PEC** (extrair registros de pré-natal existentes), **escrever dados via LEDI API** (enviar registros do app de volta ao PEC), e **sincronizar nacionalmente via RNDS** (FHIR R4).

### CADSUS identifica pacientes, SISPRENATAL está sendo substituído pelo e-SUS

O **CADSUS/CNS** fornece identificação única do paciente via web services SOAP (perfis IHE PIX/PDQ). O endpoint WSDL é `https://servicos.saude.gov.br/cadsus/CadsusService/v5r0?wsdl`. Permite buscar paciente por CNS, CPF, nome, nome da mãe ou data de nascimento, retornando dados demográficos completos. A especificação técnica está disponível no site do DATASUS. O acesso é obtido via Portal de Serviços.

**Recomendação crítica: NÃO integrar diretamente com SISPRENATAL.** Desde 2017 (Nota Técnica Nº 19-SEI/2017), o Ministério da Saúde determinou que UBS usando e-SUS APS não precisam mais usar SISPRENATAL WEB. O SISAB tornou-se a fonte única para monitoramento pré-natal na atenção primária. Todos os dados de pré-natal devem fluir pelo e-SUS APS → SISAB → RNDS.

Para **dados de vacinação**, o novo SI-PNI (lançado em junho 2023) envia registros diretamente para a RNDS em tempo real. Consultar vacinas maternas (dTpa, influenza, COVID-19, hepatite B) via API FHIR da RNDS usando o portfólio **RIA** — sem necessidade de integração direta com SI-PNI.

O **SISAB** não possui API pública para microdados. É uma camada de agregação alimentada pelo e-SUS APS. Relatórios disponíveis apenas em `https://sisab.saude.gov.br/`. O SISAB está sendo substituído pelo **SIAPS** (Sistema de Informação da Atenção Primária à Saúde), que promete análises em tempo real e conformidade com LGPD.

### Perfis FHIR brasileiros e o mapeamento de dados da caderneta

Os perfis FHIR brasileiros relevantes incluem **BRIndividuo** (Patient — com CPF, CNS, extensões de etnia), **BREstabelecimentoSaude** (Organization — com CNES), **BRProfissionalSaude** (Practitioner — com CBO) e perfis para composições clínicas como BRRegistroAtendimentoClinico e BRResultadoExameLaboratorial.

**Mapeamento dos dados da Caderneta para recursos FHIR:**

| Domínio de dados | Recursos FHIR |
|-----------------|---------------|
| Dados demográficos, tipo sanguíneo | Patient (BRIndividuo) |
| Histórico obstétrico | Condition, Observation |
| Gestação atual (DUM, DPP, idade gestacional, risco) | Condition, EpisodeOfCare |
| Consultas pré-natal (peso, PA, altura uterina, BCF) | Encounter, Observation |
| Exames laboratoriais (HIV, sífilis, hepatite, glicemia) | DiagnosticReport, Observation |
| Vacinas (dTpa, influenza) | Immunization |
| Ultrassonografias | DiagnosticReport, ImagingStudy |
| Medicamentos (ácido fólico, sulfato ferroso) | MedicationRequest |
| Fatores de risco (HAS, diabetes, pré-eclâmpsia) | Condition, RiskAssessment |
| Registro do parto | Encounter, Procedure |

O servidor de terminologia nacional está em `https://terminologia.saude.gov.br/`, mapeando terminologias brasileiras para padrões internacionais (SNOMED CT, LOINC, CID-10). Uma dissertação de mestrado da UFMA implementou especificamente uma API FHIR interoperável para dados gestacionais com Django REST Framework, usando códigos LOINC para avaliação de risco gestacional e acompanhamento ponderal — uma referência técnica direta para este projeto.

### LGPD classifica dados de saúde como sensíveis, mas o SUS tem base legal específica

Sob a **Lei 13.709/2018 (LGPD)**, dados de saúde são **dados pessoais sensíveis** (Art. 5º, II), exigindo proteções reforçadas. Para o contexto SUS, a base legal primária é o **Art. 11, II, (b)**: processamento sem consentimento para **execução de políticas públicas** pela administração pública, conforme previsto em leis ou regulamentos. A base complementar é o Art. 11, II, (f): **tutela da saúde** exclusivamente em procedimentos realizados por profissionais, serviços ou autoridades sanitárias.

Os requisitos técnicos incluem: **criptografia em repouso** (AES-256 para dados armazenados), **criptografia em trânsito** (TLS 1.2+ obrigatório, TLS 1.3 recomendado), controle de acesso baseado em papéis (RBAC), **audit logging detalhado** (quem, o quê, quando, onde, resultado), Privacy by Design (Art. 46, §2 — segurança desde a fase de concepção), e gestão de consentimento para cenários além da execução de políticas públicas.

Os direitos do titular (Art. 18) que a aplicação deve suportar: acesso aos dados, correção, anonimização/bloqueio/eliminação de dados desnecessários, portabilidade, revogação de consentimento e informação sobre compartilhamento. A RNDS já implementa mecanismo de consentimento eletrônico permitindo ao cidadão recusar o compartilhamento de informações.

Para autenticação nos sistemas RNDS, certificados **ICP-Brasil** (e-CNPJ tipo A1 ou A3) são obrigatórios. O gerente do projeto deve nomear um **Encarregado de Proteção de Dados** (DPO) e em caso de incidente de segurança, notificar a ANPD e os titulares em prazo razoável (Art. 48).

---

## PARTE 3 — ARQUITETURA GERAL

### Arquitetura de referência: monólito modular evolutivo com FHIR nativo

Para um projeto municipal como Salvador (~40 mil gestações/ano, ~3 mil profissionais de saúde), a arquitetura recomendada é um **monólito modular** inicial, evoluindo para microsserviços conforme o sistema amadurece. O design **FHIR-nativo** deve ser adotado desde o primeiro dia.

```
┌───────────────────────────────────────────────────────────┐
│  CLIENTES                                                  │
│  ┌─────────────────┐    ┌────────────────────┐            │
│  │ React Native    │    │ Next.js Dashboard  │            │
│  │ App (Gestante)  │    │ (Profissionais)    │            │
│  └────────┬────────┘    └─────────┬──────────┘            │
├───────────┼────────────────────────┼──────────────────────┤
│  API GATEWAY — Kong OSS (Kubernetes)                       │
│  Rate limiting, roteamento auth, SSL termination, versionamento │
├───────────┼────────────────────────┼──────────────────────┤
│  CAMADA BFF                                                │
│  ┌────────┴────────┐    ┌─────────┴──────────┐           │
│  │ Mobile BFF      │    │ Web Dashboard BFF  │           │
│  │ (NestJS)        │    │ (NestJS)           │           │
│  │ • Payloads      │    │ • Agregação dados  │           │
│  │   otimizados    │    │ • GraphQL          │           │
│  │ • Sync offline  │    │ • WebSocket        │           │
│  │ • Push notif.   │    │ • Geração PDF      │           │
│  └────────┬────────┘    └─────────┬──────────┘           │
├───────────┼────────────────────────┼──────────────────────┤
│  SERVIÇOS CORE (NestJS + TypeScript)                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐ │
│  │ Patient  │ │ Prenatal │ │ Schedu-  │ │ Notification│ │
│  │ Service  │ │ Care Svc │ │ ling Svc │ │ Service     │ │
│  └─────┬────┘ └─────┬────┘ └─────┬────┘ └──────┬──────┘ │
├────────┼────────────┼────────────┼──────────────┼────────┤
│  CAMADA DE INTEGRAÇÃO                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐ │
│  │HAPI FHIR │ │ RNDS     │ │ e-SUS    │ │ CADSUS/CNS  │ │
│  │Server    │ │Connector │ │Connector │ │ Client      │ │
│  └─────┬────┘ └─────┬────┘ └─────┬────┘ └──────┬──────┘ │
├────────┼────────────┼────────────┼──────────────┼────────┤
│  DADOS                                                     │
│  PostgreSQL 16  │  Redis 7  │  MinIO/S3  │  RabbitMQ     │
│  (HAPI FHIR +   │  (cache,  │  (docs,    │  (async,      │
│   app data)     │  sessão)  │  imagens)  │  notif.)      │
└─────────────────────────────────────────────────────────── ┘
```

O **HAPI FHIR JPA Server** (open-source, Apache 2.0) é o servidor FHIR recomendado — suporta FHIR R4, usa PostgreSQL como backend, e é comprovado em escala com milhões de pacientes. Roda como container Docker via `hapiproject/hapi:latest`. O **Kong OSS** serve como API Gateway sem custo de licença, com rate limiting (100 req/min mobile, 500 req/min dashboard, 50 req/min sync RNDS) e suporte nativo a Kubernetes.

O padrão **BFF (Backend for Frontend)** separa as necessidades dos dois clientes. O Mobile BFF otimiza payloads (JSON compacto, paginação, thumbnails de imagens), gerencia sync offline e registro de push notifications. O Web Dashboard BFF agrega dados para relatórios, oferece endpoint GraphQL para consultas flexíveis, WebSocket para atualizações em tempo real e geração de PDFs. Ambos os BFFs são implementados em **NestJS (TypeScript)**, garantindo tipagem compartilhada com os frontends.

A API unificada expõe endpoints REST versionados (`/api/v1/patients`, `/api/v1/pregnancies`, `/api/v1/prenatal-visits`, `/api/v1/observations`, `/api/v1/immunizations`, `/api/v1/appointments`, `/api/v1/reports`) além dos endpoints FHIR nativos via HAPI (`/fhir/Patient`, `/fhir/Observation`, `/fhir/Encounter`, `/fhir/Immunization`).

O controle de acesso usa **RBAC** com cinco papéis: `GESTANTE` (leitura dos próprios dados), `ENFERMEIRO` (leitura/escrita de dados clínicos), `MEDICO` (acesso clínico completo), `GESTOR` (analytics do dashboard, leitura clínica) e `ADMIN` (administração do sistema). A autenticação combina **Keycloak** como identity provider com **SMART on FHIR** (OAuth 2.0 + OpenID Connect) para controle de acesso aos recursos FHIR.

### AWS São Paulo é a infraestrutura recomendada, com custo estimado de R$ 9 mil/mês

Para hospedagem, **AWS região sa-east-1 (São Paulo)** é a escolha primária — opera desde 2011 com 3 Availability Zones, 110+ serviços, parceria com SERPRO para governo, e Data Processing Addendum compatível com LGPD. A alternativa é Azure Brazil South (São Paulo). Dados de saúde devem permanecer em território brasileiro para simplificar conformidade LGPD, embora a lei não proíba transferência internacional com salvaguardas adequadas.

**Estimativa de custo mensal (AWS sa-east-1):**

| Recurso | Especificação | Custo USD/mês |
|---------|--------------|---------------|
| EKS Cluster | 1 cluster | $73 |
| EC2 Worker Nodes | 3× m5.large | ~$280 |
| RDS PostgreSQL | db.r5.large Multi-AZ | ~$450 |
| ElastiCache Redis | cache.r5.large 2 nós | ~$350 |
| S3 + CloudFront | 100GB storage + CDN | ~$20 |
| Amazon MQ (RabbitMQ) | mq.m5.large | ~$250 |
| ALB + Route 53 + Logs | — | ~$80 |
| **Total estimado** | | **~$1.550/mês (~R$ 9.300)** |

Reserved Instances (1 ano) reduzem custos em 30-40%. O deploy usa **Amazon EKS (Kubernetes)** com Horizontal Pod Autoscaler, namespaces separados para produção, staging e monitoramento (Prometheus + Grafana + Loki). CI/CD via GitHub Actions + ArgoCD com deploys blue/green. Infraestrutura como código via **Terraform** (AWS) + **Helm** (Kubernetes).

Para disaster recovery: RDS com snapshots diários automáticos, deploy Multi-AZ, recovery point-in-time com retenção de 35 dias. RPO alvo de 1 hora, RTO de 4 horas. Backup cross-region criptografado para us-east-1.

### A sincronização de dados combina batch diário com eventos em tempo real

A estratégia de dados integra múltiplas fontes do SUS em dois modos:

**Batch (diário):** ETL workers (NestJS + Bull queue) extraem dados do DW PEC (PostgreSQL do e-SUS APS instalado nas UBS de Salvador), transformam para FHIR R4 usando perfis RNDS, e carregam no HAPI FHIR Server. Este fluxo captura consultas pré-natal, observações clínicas e resultados de exames já registrados pelos profissionais no PEC.

**Near-real-time (eventos):** Integração event-driven com RNDS para novos documentos — quando um resultado laboratorial ou registro de vacina é publicado na RNDS, o conector busca e atualiza o registro da gestante no app. Notificações push informam a gestante sobre novos resultados disponíveis.

Para o dashboard, uma camada analítica separada usa **materialized views** no PostgreSQL com indicadores pré-computados: percentual de gestantes com início precoce (≤12 semanas), percentual com 7+ consultas, cobertura vacinal, taxa de exames no 1º trimestre, distribuição por risco e distribuição geoespacial por UBS/Distrito Sanitário. Estas views são atualizadas a cada 5 minutos via Redis cache.

A escala estimada para Salvador: **35-40 mil gestações/ano**, ~35-40 mil gestações ativas simultaneamente (ciclo de ~9 meses), ~2-3 mil profissionais de saúde no pré-natal, pico de ~5-8 mil usuários mobile simultâneos e ~500-1.000 usuários web simultâneos. O PostgreSQL com read replicas para queries do dashboard e connection pooling via PgBouncer comporta essa carga confortavelmente.

---

## CONTEXTO ESTRATÉGICO E REFERÊNCIAS

### Salvador tem infraestrutura e programa de saúde materna prontos para digitalização

Salvador opera **162 unidades de saúde** (116 USF + 46 UBS), organizadas em **12 Distritos Sanitários**, com cobertura APS de **70%** (alcançada em 2024). O **Programa Mãe Salvador** (lançado em 2020) é o veículo natural de implementação: cadastrou 32 mil gestantes nos primeiros 17 meses, oferece Salvador Card (30 passagens gratuitas para consultas), enxoval para beneficiárias do Bolsa Família com 7+ exames, e tem foco explícito em equidade racial — dados mostraram que mulheres negras (pretas/pardas) tinham maior dificuldade em completar o pré-natal.

Não existe caderneta digital oficial. O mapa de vinculação materna de Salvador (Lei Municipal 7.851/2010) vincula gestantes a maternidades de referência por bairro/distrito — funcionalidade que a caderneta digital pode integrar com QR Code para acesso rápido em emergências.

Referências internacionais validam o modelo: o **BadgerNet** (UK NHS) prova que substituir cadernetas em papel por registros digitais acessíveis por pacientes e clínicos funciona em escala em sistema público. O **OpenSRP** (14+ países, 120 mil gestantes rastreadas na Indonésia) demonstra arquitetura FHIR-nativa com operação híbrida offline/online para saúde materna em contextos de baixa conectividade. O **WHO Digital ANC Module** fornece data dictionary e lógica de decisão clínica validados internacionalmente — levou ~11 meses do conceito ao protótipo estável.

No Brasil, o **Laboratório Bridge/UFSC** (desenvolvedor do e-SUS APS, 660 mil usuários, 5+ bilhões de registros) oferece o **Bold Design System** (React, open-source) e a documentação de integração LEDI. O **LAIS/UFRN** demonstrou capacidade de deploy estadual com o RN Mais Vacina (167 municípios em 10 dias) e mantém projeto Sífilis Não — diretamente relevante para pré-natal.

### Tabela-resumo das integrações prioritárias

| Sistema | Protocolo | Autenticação | Formato | Direção | Prioridade |
|---------|----------|-------------|---------|---------|-----------|
| **RNDS** | HTTPS/REST | ICP-Brasil cert + OAuth token | FHIR R4 JSON | Bidirecional | 1 — Principal |
| **CADSUS/CNS** | SOAP/HTTPS | Username/password (DATASUS) | XML/SOAP | Consulta | 2 — Identidade |
| **e-SUS APS (DW)** | PostgreSQL | Credenciais DB (local) | SQL | Leitura | 3 — Dados locais |
| **e-SUS APS (LEDI API)** | HTTPS/REST | Username/password (PEC admin) | Binário .esus | Escrita | 4 — Retroalimentação |
| **gov.br** | OAuth 2.0 + OIDC | Client ID/Secret + PKCE | JSON | Auth | 5 — Autenticação |

---

## Conclusão

A Caderneta da Gestante Digital para Salvador deve ser construída como **complemento ao e-SUS APS PEC** — não como substituto — dando às gestantes acesso mobile aos seus dados de pré-natal que hoje existem apenas no sistema dos profissionais. A combinação React Native + Expo (offline-first com WatermelonDB) para o app e Next.js + Shadcn/UI + Recharts para o dashboard, sobre backend NestJS com HAPI FHIR Server e integração RNDS via mTLS, é tecnicamente sólida e alinhada ao ecossistema de saúde digital brasileiro.

O diferencial competitivo frente a soluções comerciais como V-Baby é a **integração nativa com sistemas do SUS**: dados recuperados automaticamente da RNDS e do e-SUS APS, autenticação via gov.br, e alinhamento com os perfis FHIR brasileiros. O Programa Mãe Salvador fornece base de usuários, legitimidade institucional e foco em equidade que nenhuma solução comercial oferece. O cronograma realista para MVP é **6-9 meses**, com rollout faseado iniciando em 2-3 Distritos Sanitários, usando a experiência do LAIS/UFRN (deploy em 10 dias para 167 municípios) como benchmark de velocidade de expansão. Os contatos técnicos essenciais são: DATASUS (`coinp@saude.gov.br`), Bridge/UFSC (`portal.bridge.ufsc.br`), LAIS/UFRN (`secretariado@lais.huol.ufrn.br`) e a comunidade OpenSRP para referências de arquitetura FHIR-nativa em saúde materna.