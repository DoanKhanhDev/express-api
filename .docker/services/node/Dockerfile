FROM node:20

WORKDIR /var/www/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prisma:generate

# Install nodemon globally
RUN npm install -g nodemon

RUN chmod +x ./.docker/services/node/entrypoint.sh

CMD ./.docker/services/node/entrypoint.sh
