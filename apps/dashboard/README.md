# Dashboard — Mãe Salvador

Painel do profissional de saúde e do gestor. Next.js 16 (App Router), Shadcn/UI, Tailwind CSS v4.

Além da interface, este app serve as rotas de API (`src/app/api/`) consumidas também pelo aplicativo da gestante.

Contexto do projeto, arquitetura e instruções de execução estão no [README da raiz](../../README.md).

```bash
npm run dev --workspace=apps/dashboard
```

## Variáveis de ambiente

| Variável | Uso |
|---|---|
| `ESUS_DATABASE_URL` | Réplica do e-SUS APS — somente leitura |
| `APP_DATABASE_URL` | Banco do programa Mãe Salvador — leitura e escrita |

Sem elas, a aplicação opera com os dados simulados de `src/lib/data.ts`. A rota `/api/health` reporta o estado de cada conexão.
