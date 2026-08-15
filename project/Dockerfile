# ARG NODE_VERSION=24.13.0-slim

# FROM node:${NODE_VERSION} AS base

# ARG PNPM_VERSION=11.21.0

# RUN npm install --global "pnpm@${PNPM_VERSION}"

# FROM base AS dependencies

# WORKDIR /app

# COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# RUN --mount=type=cache,target=/pnpm/store \
#     pnpm config set store-dir /pnpm/store \
#     && pnpm install --frozen-lockfile

# FROM base AS builder

# WORKDIR /app

# COPY --from=dependencies /app/node_modules ./node_modules
# COPY . .

# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1

# # test
# # Valeurs uniquement utilisées pendant la compilation
# ENV DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build
# ENV BETTER_AUTH_SECRET=build-only-secret-build-only-secret
# ENV BETTER_AUTH_URL=http://localhost:3000
# ENV AUTH_SECRET=build-only-secret-build-only-secret
# # test

# RUN --mount=type=cache,target=/app/.next/cache \
#     pnpm build

# FROM node:${NODE_VERSION} AS runner

# WORKDIR /app

# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1
# ENV PORT=3000
# ENV HOSTNAME=0.0.0.0

# COPY --from=builder --chown=node:node /app/public ./public

# RUN mkdir .next && chown node:node .next

# # Application Next.js standalone
# COPY --from=builder --chown=node:node /app/.next/standalone ./
# COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# # Fichiers légers nécessaires aux migrations
# COPY --from=builder --chown=node:node /app/drizzle.config.ts ./drizzle.config.ts
# COPY --from=builder --chown=node:node /app/db ./db
# COPY --from=builder --chown=node:node /app/drizzle ./drizzle

# USER node

# EXPOSE 3000
 
# CMD ["node", "server.js"]


  # ============================================
  # Stage 1: Dependencies Installation Stage
  # ============================================

  # ARG NODE_VERSION=24.14.0-slim

  # FROM node:${NODE_VERSION} AS dependencies

  # # Set working directory
  # WORKDIR /app

  # # Copy package-related files first to leverage Docker's caching mechanism
  # COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

  # # Install project dependencies with frozen lockfile for reproducible builds
  # RUN --mount=type=cache,target=/root/.npm \
  #     --mount=type=cache,target=/usr/local/share/.cache/yarn \
  #     --mount=type=cache,target=/root/.local/share/pnpm/store \
  #   if [ -f package-lock.json ]; then \
  #     npm ci --no-audit --no-fund; \
  #   elif [ -f yarn.lock ]; then \
  #     corepack enable yarn && yarn install --frozen-lockfile --production=false; \
  #   elif [ -f pnpm-lock.yaml ]; then \
  #     corepack enable pnpm && pnpm install --frozen-lockfile; \
  #   else \
  #     echo "No lockfile found." && exit 1; \
  #   fi

  # # ============================================
  # # Stage 2: Build Next.js application in standalone mode
  # # ============================================

  # FROM node:${NODE_VERSION} AS builder

  # # Set working directory
  # WORKDIR /app

  # # Copy project dependencies from dependencies stage
  # COPY --from=dependencies /app/node_modules ./node_modules

  # # Copy application source code
  # COPY . .

  # ENV NODE_ENV=production

  # # Next.js collects completely anonymous telemetry data about general usage.
  # # Learn more here: https://nextjs.org/telemetry
  # # Uncomment the following line in case you want to disable telemetry during the build.
  # # ENV NEXT_TELEMETRY_DISABLED=1

  # # Build Next.js application
  # # If you want to speed up Docker rebuilds, you can cache the build artifacts
  # # by adding: --mount=type=cache,target=/app/.next/cache
  # # This caches the .next/cache directory across builds, but it also prevents
  # # .next/cache/fetch-cache from being included in the final image, meaning
  # # cached fetch responses from the build won't be available at runtime.
  # RUN if [ -f package-lock.json ]; then \
  #     npm run build; \
  #   elif [ -f yarn.lock ]; then \
  #     corepack enable yarn && yarn build; \
  #   elif [ -f pnpm-lock.yaml ]; then \
  #     corepack enable pnpm && pnpm build; \
  #   else \
  #     echo "No lockfile found." && exit 1; \
  #   fi

  # # ============================================
  # # Stage 3: Run Next.js application
  # # ============================================

  # FROM node:${NODE_VERSION} AS runner

  # # Set working directory
  # WORKDIR /app

  # # Set production environment variables
  # ENV NODE_ENV=production
  # ENV PORT=3000
  # ENV HOSTNAME="0.0.0.0"

  # # Next.js collects completely anonymous telemetry data about general usage.
  # # Learn more here: https://nextjs.org/telemetry
  # # Uncomment the following line in case you want to disable telemetry during the run time.
  # ENV NEXT_TELEMETRY_DISABLED=1

  # # Copy production assets
  # COPY --from=builder --chown=node:node /app/public ./public

  # # Set the correct permission for prerender cache
  # RUN mkdir .next
  # RUN chown node:node .next

  # # Automatically leverage output traces to reduce image size
  # # https://nextjs.org/docs/advanced-features/output-file-tracing
  # COPY --from=builder --chown=node:node /app/.next/standalone ./
  # COPY --from=builder --chown=node:node /app/.next/static ./.next/static

  # # If you want to persist the fetch cache generated during the build so that
  # # cached responses are available immediately on startup, uncomment this line:
  # # COPY --from=builder --chown=node:node /app/.next/cache ./.next/cache

  # # Switch to non-root user for security best practices
  # USER node

  # # Expose port 3000 to allow HTTP traffic
  # EXPOSE 3000

  # # Start Next.js standalone server
  # CMD ["node", "server.js"]

  
# Make sure it uses up to date node js version
FROM node:24-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
# If you still run into build issue, go to "Problem #3: Making /app is read only.
# in case you have permission issues.
WORKDIR /app

# pour les erreurs approve-build de Next -> bien check si pnpm-workplace.yaml est copier + ajout a la main dans le fichier de la dépendance si nécessaire
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* pnpm-workspace.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# --- Permet de lancer les migrations Drizzle --- #
FROM base AS migrator
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
CMD ["pnpm", "run", "db:migrate"]
# ----------------------------------------

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PRIVATE_STANDALONE=true

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PRIVATE_STANDALONE=true

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Ensuring no unnecessary permissions are given and add necessary permissions for it to run server.js properly.
RUN chmod -R a-w+x . && chmod -R a+x .next node_modules

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]