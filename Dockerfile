# ============================================================
#  Befhue Frontend — Multi-Stage Dockerfile
#  Stack: Next.js 16 · React 19 · TypeScript · Tailwind CSS v4
# ============================================================

# ---- Stage 1: Base ----------------------------------------
# Shared base image pinned to a specific LTS version for
# reproducibility. Alpine keeps the image size minimal.
FROM node:20-alpine AS base

# Install libc compat layer needed by some native bindings
# and ca-certificates for HTTPS calls during build.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# ---- Stage 2: Dependencies --------------------------------
# Install ALL dependencies (including devDeps) so the build
# stage can compile TypeScript, run PostCSS/Tailwind, etc.
FROM base AS deps

# Copy only the lockfile + manifest first so Docker can cache
# this layer and skip re-installing when source files change.
COPY package.json package-lock.json* ./

RUN npm ci --ignore-scripts

# ---- Stage 3: Builder ------------------------------------
# Compile the production Next.js bundle.
FROM base AS builder

WORKDIR /app

# Bring in the full node_modules from the deps stage.
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the source code.
COPY . .

# Next.js collects anonymous telemetry — disable it in CI/CD.
ENV NEXT_TELEMETRY_DISABLED=1

# Build the production bundle.
# Output mode "standalone" bundles everything needed to run
# the app without node_modules, drastically reducing the final
# image size. Enable it in next.config.ts (see note below).
RUN npm run build

# ---- Stage 4: Runner (Production Image) ------------------
# Only copy the compiled output — no source, no devDeps.
FROM node:20-alpine AS runner

WORKDIR /app

# Non-root user for security best practices.
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Required runtime environment variables.
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Port the Next.js server listens on (override via -e PORT=xxx).
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# ── Copy build artefacts ──────────────────────────────────

# Public folder (fonts, images, svgs — served statically).
COPY --from=builder /app/public ./public

# Next.js static assets generated during build.
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Standalone server bundle (requires `output: 'standalone'` in
# next.config.ts — add it if not already present).
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Switch to the non-root user.
USER nextjs

# Expose the application port.
EXPOSE 3000

# Health-check so orchestrators (Kubernetes, ECS, etc.) know
# when the container is ready to serve traffic.
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

# Start the standalone Next.js server.
CMD ["node", "server.js"]
