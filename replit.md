# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.
The main project is **Fellah Market** (فلاح ماركت) — a full-stack Algerian Agriculture Marketplace.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite, Tailwind CSS, shadcn/ui, Framer Motion, React Query, Wouter

## Main App: Fellah Market (فلاح ماركت)

A full-stack Algerian agriculture marketplace at `artifacts/agri-market`.

### Pages
- `/` — Homepage with hero, search, featured products, categories, market ticker, how it works
- `/products` — Full product listing with filters (category, wilaya, price, organic)
- `/products/:id` — Product detail with gallery, seller info, contact form
- `/categories` — All 8 product categories with product counts
- `/sellers` — Farmer/seller directory with search and filters
- `/sellers/:id` — Individual seller profile with their products
- `/marche` — Live market prices dashboard with trend indicators
- `/about` — About page with mission and stats
- `/contact` — Contact form

### Data
- 30 Algerian wilayas seeded
- 8 product categories (Légumes, Fruits, Céréales, Élevage, Équipement, Semences, Huiles, Herbes)
- 10 farmers/sellers from different wilayas
- 24 agricultural products with real photos, bilingual names (French + Arabic), prices in DZD
- 20 market price entries with trend data

### API Endpoints
- `GET /api/products` — List products with filters
- `GET /api/products/:id` — Product detail
- `GET /api/categories` — Categories with product counts
- `GET /api/sellers` — Seller list
- `GET /api/sellers/:id` — Seller profile
- `GET /api/wilayas` — All 48 Algerian wilayas
- `GET /api/market-prices` — Current market prices
- `POST /api/messages` — Send contact/inquiry message

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server (port auto-assigned)
│   └── agri-market/        # React+Vite frontend at /
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml     # pnpm workspace
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## DB Schema

Tables: `wilayas`, `categories`, `sellers`, `products`, `market_prices`, `messages`

Production migrations are handled by Replit when publishing. In development: `pnpm --filter @workspace/db run push`

## Codegen

Run codegen: `pnpm --filter @workspace/api-spec run codegen`
