# typescript-fullstack

> **Legacy TypeScript API / monorepo experiment**

This repository is retained as supporting engineering history. It exposes only the application behavior that actually exists: a small **Express + TypeScript API** with a health endpoint and an in-memory item resource.

It is **not** presented as a complete full-stack application, production authentication system, PostgreSQL/Redis platform, Prisma project, or DDD reference implementation.

## Implemented API

### Health

```text
GET /api/v1/health
```

Returns basic service health, timestamp, and process uptime.

### In-memory items

```text
GET    /api/v1/items
POST   /api/v1/items
GET    /api/v1/items/:id
DELETE /api/v1/items/:id
```

The item collection exists only in process memory. Restarting the application resets it.

`POST /api/v1/items` accepts a non-empty `name` string and rejects missing/blank names.

## Correctness and safety hardening

- importing the application no longer starts a network listener as a side effect;
- TCP port parsing is isolated and validated;
- unexpected 5xx errors are logged server-side without returning internal exception details to clients;
- executable Node tests start the real Express application on an ephemeral loopback port and verify health plus create/get/delete item flows;
- CI executes those tests on Node.js 20 and 22.

## Removed placeholder authentication

Earlier code accepted any non-empty bearer token, injected a hard-coded user identity, and returned a literal placeholder token from login. That behavior was not real authentication and remains removed.

The repository currently makes **no authentication or authorization claim**.

## Run

Requirements:

- Node.js 20+
- npm

From the repository root:

```bash
npm install
npm run build
npm run dev
```

The API defaults to port `3000`; set `PORT` to a valid TCP port from 1 through 65535 to override it.

## Validation

```bash
npm run typecheck
npm test
```

The package-level quality gate runs type checking, compilation, and executable API tests. GitHub Actions runs that gate on Node.js 20 and 22 and audits production dependencies for high-severity findings.

## Current structure

```text
typescript-fullstack/
├── apps/
│   └── api/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── index.ts
│           ├── index.test.ts
│           ├── middleware/
│           │   └── error.middleware.ts
│           ├── routes/
│           │   └── item.routes.ts
│           └── utils/
│               └── async.ts
├── packages/
│   ├── types/     # retained source experiment; not part of active workspace build
│   └── ui/        # retained source experiment; not part of active workspace build
├── package.json
└── .github/workflows/ci.yml
```

## Scope boundaries

Previous documentation claimed components that are not present in the repository, including:

- Next.js frontend
- PostgreSQL
- Redis
- Prisma
- database migrations
- shared config package
- Clean Architecture / DDD implementation

Those claims remain excluded.

## Portfolio role

**Classification: ARCHIVE / secondary engineering work.**

This repository demonstrates basic TypeScript/Express structure, error-boundary discipline, and executable route testing. It remains public as historical context and is not part of the profile's FX/Quant flagship portfolio.
