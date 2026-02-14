# Mãe Salvador — Caderneta da Gestante Digital

![Status](https://img.shields.io/badge/status-MVP%20em%20desenvolvimento-yellow)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

## O que é

Uma solução digital para acompanhamento pré-natal na rede pública de saúde de Salvador. A proposta é dar à gestante uma **caderneta digital** acessível pelo celular — com seus dados pessoais, consultas, exames, vacinas e medicações — e oferecer aos profissionais de saúde e gestores um **painel (dashboard)** com visão integrada das gestantes vinculadas, indicadores de desempenho e ferramentas de registro clínico.

O projeto nasce no contexto do **Programa Mãe Salvador**, que já cadastrou mais de 32 mil gestantes e oferece benefícios como o Salvador Card (transporte gratuito para consultas). Hoje, o acompanhamento depende de cadernetas em papel — o Ministério da Saúde distribui 3 milhões por ano. A digitalização elimina perdas, centraliza informações e conecta gestantes à equipe de saúde.

> A pesquisa técnica completa que fundamenta as decisões de arquitetura, integrações com sistemas do SUS (RNDS, e-SUS APS, CADSUS) e stack tecnológico está disponível em [`docs/relatorio_pesquisa_tecnica_mae-salvador.md`](docs/relatorio_pesquisa_tecnica_mae-salvador.md).

## Escopo atual (MVP)

Este repositório contém um **MVP funcional** que demonstra a interface dos dois produtos:

**App mobile (gestante)** — interface da caderneta digital:
- Login simulado (gov.br mockado)
- Tela inicial com resumo da gestação, próxima consulta e atalhos rápidos
- Caderneta com seções: dados pessoais, consultas pré-natal, exames, vacinas, medicações
- Cartão Mãe Salvador digital
- Central de avisos e notificações

**Dashboard web (profissional/gestor)** — painel de acompanhamento:
- Login com seleção de perfil (enfermeiro, médico, gestor)
- Painel de gestantes com busca, filtros e classificação de risco
- Ficha completa da gestante (5 abas: resumo, consultas, exames, vacinas, medicações)
- Formulário de registro de consulta pré-natal
- Dashboard do gestor com KPIs, gráficos e indicadores Previne Brasil

> **Nota:** Este MVP utiliza dados mockados. A integração com backend, banco de dados e sistemas do SUS (RNDS, e-SUS APS, gov.br) está fora do escopo atual e será implementada por equipes futuras, seguindo a arquitetura descrita na pesquisa técnica.

## Stack

- **Monorepo** com npm workspaces
- **App mobile:** React Native + Expo (SDK 54), expo-router, Zustand, StyleSheet nativo
- **Dashboard:** Next.js 16 (App Router), Shadcn/UI, Tailwind CSS v4, Recharts, TanStack Table
- **Pacote compartilhado:** tipos TypeScript, constantes (12 distritos, 8 UBS, fatores de risco, calendário vacinal) e dados mock

## Estrutura do projeto

```
mae-salvador-mvp/
├── apps/
│   ├── dashboard/         # Next.js — painel do profissional/gestor
│   └── mobile/            # Expo — app da gestante
├── packages/
│   └── shared/            # Tipos, constantes e dados mock compartilhados
├── docs/
│   └── relatorio_pesquisa_tecnica_mae-salvador.md
└── package.json           # Workspaces root
```

## Como rodar localmente

**Pré-requisitos:** Node.js ≥ 20, npm

```bash
# Instalar dependências (raiz do monorepo)
npm install

# Dashboard (abre em http://localhost:3000)
npm run dev --workspace=apps/dashboard

# App mobile — web (abre em http://localhost:8081)
cd apps/mobile
npx expo start --web
```

## Próximos passos

O MVP demonstra a interface e o fluxo de uso. As próximas etapas, descritas em detalhe na pesquisa técnica, incluem:

1. **Backend** — API NestJS com HAPI FHIR Server e PostgreSQL
2. **Autenticação** — Integração real com Login Único gov.br (OAuth 2.0 + PKCE)
3. **Integração SUS** — Conexão com RNDS (FHIR R4), e-SUS APS (DW PEC + LEDI API) e CADSUS/CNS
4. **Offline-first** — WatermelonDB no app mobile para operação sem internet nas UBS
5. **Deploy** — AWS sa-east-1 (EKS + RDS + ElastiCache) conforme arquitetura de referência

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
