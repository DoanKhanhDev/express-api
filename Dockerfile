FROM node:20-alpine
ENV NODE_PATH=./build
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm run build
COPY . .
EXPOSE 8000
RUN chown -R node /app
USER node
CMD ["npm", "run", "dev"]
