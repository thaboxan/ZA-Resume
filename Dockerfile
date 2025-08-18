FROM node:20-bookworm-slim AS deps
WORKDIR /app
COPY package*.json ./
# Install all deps (including dev) for build stage caching
RUN npm ci

FROM node:20-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Create a minimal production node_modules set
FROM node:20-bookworm-slim AS prod-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Distroless runtime (no shell, no npm) for lower CVE surface
FROM gcr.io/distroless/nodejs20-debian12:nonroot AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --chown=nonroot:nonroot package*.json ./
COPY --chown=nonroot:nonroot --from=prod-deps /app/node_modules ./node_modules
COPY --chown=nonroot:nonroot --from=builder /app/build ./build
COPY --chown=nonroot:nonroot --from=builder /app/public ./public

EXPOSE 3000
# Use node directly since npm is not present in distroless
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3000"]