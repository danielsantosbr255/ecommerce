FROM node:22.16.0-alpine

WORKDIR /api

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]