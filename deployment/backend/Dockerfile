FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NODE_ENV production
ENV PORT 5000

# Expose the port the app will run on
EXPOSE 5000

# Create a non-root user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

# Set the correct permissions
RUN chown -R expressjs:nodejs /app

# Switch to non-root user
USER expressjs

# Start the application
CMD ["node", "src/server.js"]
