# Dashboard Mãe Salvador

[![TypeScript 5.9.3](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](../../package-lock.json) [![Next.js 16.1.6](https://img.shields.io/badge/Next.js-16.1.6-000000?logo=nextdotjs&logoColor=white)](package.json) [![React 19.2.3](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react&logoColor=black)](package.json) [![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](package.json)

Interface do profissional de saúde e do gestor no sprint inicial do Mãe Salvador. Na `master`, utiliza os dados simulados de `@mae-salvador/shared`; na `test4`, acrescenta as rotas de API do protótipo de integração, detalhado no [README da raiz](../../README.md).

## Executar na master

Na raiz do monorepo, com Node.js 20.19.4 ou superior e npm:

```sh
npm ci
npm run dev --workspace=apps/dashboard
```

A `master` não contém `src/app/api/`, `src/lib/db.ts` ou os adaptadores de banco. A seleção de perfil da interface utiliza estado local e não autentica no servidor.

## Integração na test4

A `test4` expõe [19 rotas de API](https://github.com/ayanliger/mae-salvador-mvp/tree/1630273a84a73b00028fb2c28392b00ebf532514/apps/dashboard/src/app/api). As páginas do dashboard também carregam dados diretamente pelos adaptadores no servidor, e o cadastro do mobile chama `/api/cadastro`.

Variáveis de ambiente utilizadas nessa branch:

| Variável | Uso |
|---|---|
| `ESUS_DATABASE_URL` | Réplica do e-SUS APS, com role de leitura |
| `APP_DATABASE_URL` | Banco do programa Mãe Salvador, com leitura e escrita |

Comportamento e limites dessa integração:

- Preparação dos bancos: passos descritos na seção [Integração local na test4](../../README.md#integração-local-na-test4) do README da raiz.
- Rota [/api/health](https://github.com/ayanliger/mae-salvador-mvp/blob/1630273a84a73b00028fb2c28392b00ebf532514/apps/dashboard/src/app/api/health/route.ts): reporta `esus` e `app` no JSON, mas o status HTTP considera apenas a conexão e-SUS.
- Fallback parcial: algumas rotas da integração ainda leem `src/lib/data.ts`, portanto definir ou omitir as variáveis não alterna toda a aplicação entre mock e banco.
