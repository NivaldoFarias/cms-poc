# 1. Install dependencies only when needed
FROM node:19-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /src/
COPY package.json yarn.lock ./

RUN mkdir -p apps/server/
COPY ./apps/server/ /src/apps/server/

RUN mkdir -p packages/
COPY ./packages/ /src/packages/

RUN yarn install --frozen-lockfile

# 2. Rebuild the source code only when needed
FROM node:19-alpine AS builder

WORKDIR /src/

COPY . .
COPY --from=deps /src/node_modules ./node_modules

WORKDIR /src/apps/server/
RUN yarn build

# 3. Production image, copy all the files and run server
FROM node:19-alpine AS runner
WORKDIR /src/

COPY --from=builder /src/node_modules ./node_modules
COPY --from=builder /src/apps/server/dist/ ./apps/server/

EXPOSE 5000

CMD ["node", "apps/server/server.js"]