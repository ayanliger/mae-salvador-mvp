# Mãe Salvador — Caderneta da Gestante Digital

![Status](https://img.shields.io/badge/status-sprint%20de%20kickstart%20conclu%C3%ADdo-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

> **Estado deste repositório.** Este é o resultado de um sprint de cerca de cinco dias (12 a 17 de fevereiro de 2026), feito como *kickstart* do projeto de caderneta digital do Programa Mãe Salvador. O desenvolvimento teve continuidade em um repositório próprio, criado junto com a equipe integrada do projeto. Este repositório permanece como registro do sprint inicial e da arquitetura de integração validada nele.

## O que é

Uma solução digital para acompanhamento pré-natal na rede pública de saúde de Salvador, com dois produtos:

- **App da gestante** — caderneta digital no celular: dados pessoais, consultas, exames, vacinas, medicações, cartão do programa e avisos.
- **Dashboard do profissional/gestor** — painel com as gestantes vinculadas, ficha clínica completa, classificação de risco, registro de consulta e indicadores de desempenho.

O contexto é o Programa Mãe Salvador, que acompanha mais de 32 mil gestantes e hoje depende de cadernetas em papel. A digitalização elimina perdas, centraliza informação e conecta a gestante à equipe de saúde.

## O sprint

O objetivo não era entregar um produto, e sim tirar o projeto do papel rápido o suficiente para que as decisões seguintes fossem tomadas sobre código rodando, não sobre suposição. Em cinco dias, com desenvolvimento assistido por IA, o sprint precisava responder a três perguntas:

1. **Como é a cara do produto?** Quais telas, quais fluxos, o que a gestante vê e o que o profissional precisa registrar.
2. **Dá para montar a caderneta a partir dos dados que já existem?** Ou seja: o e-SUS APS tem o suficiente para preencher uma caderneta sem redigitação.
3. **Onde ficam os dados que o e-SUS não modela?** Transcard, kit enxoval, consentimento, encaminhamento ao CRAS, notificações — nada disso existe no e-SUS.

As três foram respondidas. O trabalho evoluiu em duas etapas, ainda visíveis nas branches: primeiro a interface completa sobre dados simulados, depois a camada real de integração com uma réplica do e-SUS.

## Arquitetura

### Princípio central: o e-SUS continua sendo o sistema de registro clínico

A decisão mais importante do sprint, e a que sustenta todo o resto: **o sistema não cria dado clínico.** O e-SUS APS PEC é o que os profissionais já usam diariamente e o que alimenta o SISAB — que por sua vez determina o repasse do Previne Brasil. Um registro clínico paralelo levaria a redigitação (e ao abandono do sistema pela equipe) ou a perda de financiamento para o município.

Disso decorre a divisão:

| | Fonte de verdade | Acesso |
|---|---|---|
| Dados clínicos e cadastrais | e-SUS APS (réplica) | **somente leitura** |
| Dados do programa | banco próprio `mae_salvador` | leitura e escrita |

O "dado do programa" é tudo que o e-SUS não representa: vinculação de Transcard, etapas do Mãe Salvador, consentimento LGPD, recusa de benefício, encaminhamento ao CRAS, atividades educativas, visitas à maternidade, notificações e casos de sífilis em acompanhamento.

### Dois bancos, dois pools

`apps/dashboard/src/lib/db.ts` mantém dois pools distintos. A leitura do e-SUS é forçada como somente-leitura em dois níveis — role dedicada (`esus_leitura`, com `GRANT SELECT`) e `SET default_transaction_read_only = ON` em cada conexão — de modo que uma escrita acidental falha no banco, não depende de disciplina do código.

### Views versionadas sobre o schema do PEC

O acesso ao e-SUS nunca é feito direto nas tabelas do PEC. A migration `001_views.sql` cria o schema `mae_salvador` **dentro da réplica**, com 20 views que traduzem o modelo do PEC para o domínio da caderneta (`vw_gestante`, `vw_consulta_prenatal`, `vw_exame`, `vw_vacina_gestante`, `vw_medicacao`, `vw_fator_risco`, entre outras).

A estratégia é **DW-primary**: o grosso vem do star schema do PEC (`tb_fat_*` / `tb_dim_*`), estável e indexado, e as tabelas transacionais são usadas apenas para o que o DW não carrega — dados organizacionais (profissional, UBS, equipe, lotação) e as evoluções SOAP. As views transacionais aplicam `DISTINCT ON` com filtro de auditoria para pegar a versão vigente de cada registro.

O ganho é isolamento: quando o schema do PEC mudar de versão, o reparo é nas views, não espalhado pela aplicação.

### Classificação de risco por CID-10 e CIAP-2

O risco gestacional não é campo preenchido à mão — é derivado dos problemas e condições registrados no prontuário, via CID-10 e CIAP-2, seguindo o *Manual de Gestação de Alto Risco* (MS, 2022) e o Caderno de Atenção Básica nº 32. Cobre síndromes hipertensivas, diabetes, gestação múltipla, placenta prévia, HIV, sífilis, cardiopatias, doença falciforme, doença renal crônica, epilepsia, lúpus, tireoidopatias e transtornos por uso de substâncias.

Essa é a parte de maior densidade de domínio do repositório e fica em `esus-data.ts`, junto às queries.

### Camada de dados intercambiável

Três módulos com a mesma assinatura de funções, o que permitiu substituir mock por dado real uma função por vez, sem tocar em tela:

- `lib/data.ts` — dados simulados
- `lib/esus-data.ts` — leitura da réplica do e-SUS
- `lib/app-data.ts` — leitura e escrita do banco do programa

Enquanto a troca não termina, os componentes `MockBadge` e `MockSection` marcam visualmente na interface o que ainda é simulado. Sem isso, uma demonstração com dado misto engana quem assiste.

### API

19 rotas em `apps/dashboard/src/app/api/` cobrem gestantes, consultas, exames, vacinas, medicações, transcard, profissionais, UBS, equipes, indicadores, KPIs, sífilis e cadastro. O app mobile consome as mesmas rotas (`apps/mobile/constants/Api.ts`), o que na prática torna o Next.js o backend dos dois produtos. Há uma rota `/api/health` que reporta a conectividade de cada banco separadamente.

## Estado por branch

O sprint terminou com o trabalho distribuído entre branches, e vale saber onde cada coisa está:

- **`master`** — os dois aplicativos com a interface completa sobre dados simulados. É o que roda sem nenhuma infraestrutura.
- **`test4`** — o estado mais avançado (17/02). Acrescenta toda a camada de integração: `database/` com Dockerfile, migrations e queries de validação, os pools de conexão, `esus-data.ts`, `app-data.ts`, as rotas de API e o mapeamento do schema do PEC.

As branches `test`, `test2` e `test3` são estados intermediários do mesmo trabalho.

## Stack

- **Monorepo** com npm workspaces
- **App mobile:** React Native + Expo (SDK 54), expo-router, Zustand
- **Dashboard:** Next.js 16 (App Router), Shadcn/UI, Tailwind CSS v4, Recharts, TanStack Table
- **Dados:** PostgreSQL 16 — réplica do e-SUS APS (leitura) + banco do programa (escrita), acesso via `pg` e SQL direto
- **Pacote compartilhado:** tipos de domínio, constantes (distritos, UBS, fatores de risco, calendário vacinal), queries e mapeamento do schema do PEC

Não há ORM. Como a maior parte do acesso é leitura de um schema que não nos pertence, SQL explícito sobre views versionadas se mostrou mais direto e mais fácil de auditar do que uma camada de abstração.

## Como rodar

**Pré-requisitos:** Node.js ≥ 20, npm. Para a camada de dados, Docker e um dump do e-SUS.

```bash
npm install
```

**Interface com dados simulados** (branch `master`, sem infraestrutura):

```bash
npm run dev --workspace=apps/dashboard
```

```bash
npm run web --workspace=apps/mobile
```

**Com a réplica do e-SUS** (branch `test4`): coloque o dump do PEC em `database/` e suba o container. O `init-db.sh` restaura o dump, cria a role de leitura, cria o banco `mae_salvador` e aplica as migrations nos dois bancos.

```bash
docker compose up -d
```

Configure então `ESUS_DATABASE_URL` e `APP_DATABASE_URL` no ambiente do dashboard e confirme em `/api/health`.

`database/validation_queries.sql` reúne as consultas usadas para conferir se as views batem com o que o PEC mostra — é o ponto de partida para validar qualquer réplica nova.

## Limitações conhecidas

Registradas porque são o ponto de partida de qualquer continuidade, não porque sejam surpresa num sprint de cinco dias:

- **Autenticação é simulada.** O login seleciona um perfil; não há gov.br, nem IdP, nem sessão real. Os níveis de acesso (equipe, gerente, distrital, central) existem na interface mas não são aplicados no servidor — qualquer rota de API responde a qualquer chamada.
- **Não há auditoria de acesso.** Para dado de saúde identificado, isso é requisito de LGPD, não melhoria.
- **A latência do dado é de um dia.** O DW do PEC é populado por ETL noturno. A consulta de hoje não aparece hoje — restrição de produto, não de implementação.
- **O mapeamento do schema do PEC é engenharia reversa** e está atrelado à versão do dump usado no sprint. Atualização do PEC exige revalidar as views.
- **Não há escrita de volta ao e-SUS.** O caminho oficial (LEDI) é orientado a fichas do CDS, em lote, e não foi avaliado.
- **Não há testes automatizados** nem pipeline de CI.
- **O dado sensível é tratado como ambiente local.** Não há definição de onde a réplica pode rodar em produção, o que é decisão de infraestrutura e de política, não de engenharia.

## Estrutura

```
mae-salvador-mvp/
├── apps/
│   ├── dashboard/         # Next.js — painel e API
│   └── mobile/            # Expo — app da gestante
├── packages/
│   └── shared/            # Tipos, constantes, queries e mapeamento do e-SUS
├── database/              # (branch test4) Dockerfile, migrations, validação
└── docs/                  # Referências de domínio
```

`docs/` guarda as referências de domínio usadas durante o sprint: a Caderneta da Gestante do Ministério da Saúde (8ª edição) e os requisitos do projeto.

## Licença

[MIT](LICENSE).
