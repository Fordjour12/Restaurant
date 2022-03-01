FROM node:17-slim

WORKDIR /src/api

COPY package*.json ./

#RUN npm ci --only=production
RUN npm install

COPY . ./

EXPOSE 5000

CMD ["node", "./bin/www"]

