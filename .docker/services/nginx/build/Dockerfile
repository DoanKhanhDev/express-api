FROM nginx:1.25.4

LABEL maintainer="express-api-site@gmail.dev.com"

# Install modules
RUN apt-get update && apt-get install -y \
    g++ \
    zip \
    vim \
    curl \
    openssl \
    libssl-dev \
    --no-install-recommends apt-utils \
    && rm -r /var/lib/apt/lists/*

WORKDIR /var/www/app

# Copy and set execute permission for command script
COPY ./nginx/build/command.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Set entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]
