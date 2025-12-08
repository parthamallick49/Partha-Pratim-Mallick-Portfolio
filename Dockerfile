# 1. Builder stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# 2. Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set the user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Set the host for the server to be accessible from outside the container
ENV PORT 3000
ENV HOSTNAME 0.0.0.0

# Start the app
CMD ["node", "server.js"]
