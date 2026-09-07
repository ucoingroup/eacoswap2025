# ===== EACOswap Dockerfile =====
# Multi-stage: install deps -> copy app -> production runtime
# Using DaoCloud mirror for China network environment

FROM docker.m.daocloud.io/library/node:20-alpine AS builder

LABEL maintainer="EACOswap"
LABEL description="EACOswap - Solana DEX Navigation & EACO Exchange Hub (Backend + Frontend)"

WORKDIR /app

# Copy backend package files and install deps
COPY backend/package.json backend/package-lock.json* ./

RUN npm install --production && \
    npm cache clean --force

# ---- Production stage ----
FROM docker.m.daocloud.io/library/node:20-alpine AS production

WORKDIR /app

# Install tini for proper signal handling in Alpine
RUN apk add --no-cache tini

# Copy node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy backend source
COPY backend/ ./backend/

# Copy frontend (static files served by Express)
COPY frontend/ ./frontend/

# Set working directory to backend (where server.js lives)
WORKDIR /app/backend

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

# Environment defaults
ENV NODE_ENV=production
ENV PORT=3000
ENV CORS_ORIGINS=*
ENV RATE_LIMIT_PER_MINUTE=60
ENV CACHE_TTL=60

# Expose port
EXPOSE 3000

# Health check (hit the /api/health endpoint)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

# Use tini as init for clean signal handling
ENTRYPOINT ["/sbin/tini", "--"]

# Start the server
CMD ["node", "server.js"]
