FROM node:20-bullseye-slim AS builder
WORKDIR /app
COPY . .
ENV DEPLOY_ENV=prod
RUN npm ci
RUN npm run build

FROM node:20-bullseye-slim
WORKDIR /app
COPY --from=builder /app/.output /app
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV NUXT_PUBLIC_DATA_BASE_URL "https://hear-files.wolfgangdrescher.ch/{0}"
EXPOSE 3000 
ENTRYPOINT ["node", "./server/index.mjs"]
