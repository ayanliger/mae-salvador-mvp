# Caderneta da Gestante Digital — Salvador

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)

Aplicação web para acompanhamento pré-natal vinculada à rede municipal de saúde de Salvador (SUS). Digitaliza a caderneta da gestante, permitindo que profissionais de saúde registrem consultas e que gestantes acompanhem sua gestação de forma integrada.

## Funcionalidades

**Gestante**
- Cadastro com dados pessoais, obstétricos e socioeconômicos
- Dashboard com informações da UBS/maternidade vinculada
- Caderneta digital: orientações, ganho de peso (IMC), antecedentes obstétricos e profilaxias
- Histórico de consultas, exames, vacinas e medicações
- Cartão Mãe Salvador (programa de transporte municipal)
- Notificações in-app

**Profissional de Saúde**
- Painel de gestantes vinculadas
- Registro de consultas pré-natal (peso, PA, altura uterina, BCF)
- Busca de gestantes por CPF

## Stack

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4
- **Banco de dados:** SQLite via Prisma 7 + better-sqlite3
- **Autenticação:** NextAuth v5 (beta)
- **Schema:** Modelagem alinhada ao padrão FHIR R4

## Pré-requisitos

- Node.js ≥ 20
- npm

## Instalação

```bash
cd app
npm install
```

### Configurar variáveis de ambiente

Crie o arquivo `app/.env`:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="sua-chave-secreta"
NEXTAUTH_URL="http://localhost:3000"
```

### Configurar banco de dados

```bash
npx prisma migrate dev
npx prisma db seed
```

O seed popula o banco com dados de exemplo (gestantes, profissionais, consultas, etc.).

## Execução

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto

```
app/
├── prisma/              # Schema, migrações e seed
├── src/
│   ├── app/
│   │   ├── api/         # Rotas da API (gestantes, consultas, notificações)
│   │   ├── cadastro/    # Cadastro de gestante (formulário multi-etapas)
│   │   ├── gestante/    # Área da gestante (dashboard, caderneta, cartão, etc.)
│   │   ├── login/       # Autenticação
│   │   └── profissional/ # Área do profissional de saúde
│   ├── components/      # Componentes compartilhados
│   ├── generated/       # Cliente Prisma gerado
│   └── lib/             # Prisma client, NextAuth config
└── docs/                # Documentação do projeto
```

## Observações

- A integração com APIs reais do SUS/e-SUS está fora do escopo atual — será implementada por outra equipe.
- O banco SQLite é para desenvolvimento local. Em produção, será substituído por um SGBD adequado.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
