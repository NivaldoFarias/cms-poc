# 1. Install dependencies only when needed
FROM node:19-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /src/
COPY package.json yarn.lock ./

RUN mkdir -p apps/client/
COPY ./apps/client/ /src/apps/client/

RUN mkdir -p packages/
COPY ./packages/ /src/packages/

RUN yarn install --frozen-lockfile

# 2. Rebuild the source code only when needed
FROM node:19-alpine AS builder
WORKDIR /src/

COPY . .
COPY --from=deps /src/node_modules ./node_modules

WORKDIR /src/apps/client/
RUN yarn build

# 3. Production image, copy all the files and run next
FROM node:19-alpine AS runner

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /src/

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# see https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /src/apps/client/.next/standalone/ ./
COPY --from=builder --chown=nextjs:nodejs /src/apps/client/.next/static/ ./apps/client/.next/static/
COPY --from=builder /src/apps/client/public/ ./apps/client/public/

USER nextjs

EXPOSE 3000

# see https://github.com/nrwl/nx/issues/9017
CMD ["node", "apps/client/server.js"]