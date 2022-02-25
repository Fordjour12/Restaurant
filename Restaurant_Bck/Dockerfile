FROM node:17-slim

WORKDIR /src/api

COPY package*.json ./

RUN npm ci --only=production

COPY . ./

CMD ["node", "start"]

