# typescript-fullstack

> Full-stack TypeScript monorepo | React + Node.js + PostgreSQL + Redis | Clean Architecture & DDD patterns

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)

## Architecture

\`\`\`
├── apps/
│   ├── web/       # Next.js frontend
│   └── api/       # Express.js backend
├── packages/
│   ├── ui/        # Shared React components
│   ├── config/    # Shared configs (ESLint, TS)
│   └── types/     # Shared TypeScript types
└── infrastructure/
    └── db/        # Database migrations
\`\`\`

## Quick Start

\`\`\`bash
# Install dependencies
pnpm install

# Start dev servers
pnpm dev

# Build for production
pnpm build

# Database migration
pnpm db:migrate

# Run tests
pnpm test
\`\`\`

## License

MIT © SKYDRAGO-DEV
