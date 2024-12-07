FROM node:20.11.1-alpine

LABEL maintainer="express-api-site@gmail.dev.com"

# Install system dependencies
RUN apk add --no-cache \
    bash \
    curl \
    git \
    openssh-client

# Set working directory
WORKDIR /var/www/app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies and nodemon globally
RUN npm install && \
    npm install -g nodemon && \
    npm cache clean --force

# Copy application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Make entrypoint executable
RUN chmod +x ./.docker/services/node/entrypoint.sh

# Expose port
EXPOSE 8000

# Set entrypoint
ENTRYPOINT ["./.docker/services/node/entrypoint.sh"]
