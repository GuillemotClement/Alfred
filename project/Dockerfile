ARG NODE_VERSION=24.13.0-slim

FROM node:${NODE_VERSION} AS base

ARG PNPM_VERSION=11.21.0

RUN npm install --global "pnpm@${PNPM_VERSION}"

FROM base AS dependencies

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN --mount=type=cache,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store \
    && pnpm install --frozen-lockfile

FROM base AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# test
# Valeurs uniquement utilisées pendant la compilation
ENV DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build
ENV BETTER_AUTH_SECRET=build-only-secret-build-only-secret
ENV BETTER_AUTH_URL=http://localhost:3000
ENV AUTH_SECRET=build-only-secret-build-only-secret
# test

RUN --mount=type=cache,target=/app/.next/cache \
    pnpm build

FROM node:${NODE_VERSION} AS runner

WORKDIR /app

RUN npm install --global pnpm@11.21.0

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/public ./public

RUN mkdir .next && chown node:node .next

# Application Next.js standalone
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# Fichiers légers nécessaires aux migrations
COPY --from=builder --chown=node:node /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder --chown=node:node /app/db ./db
COPY --from=builder --chown=node:node /app/drizzle ./drizzle

USER node

EXPOSE 3000

CMD ["node", "server.js"]