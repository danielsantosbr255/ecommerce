FROM node:22.16.0-alpine

WORKDIR /api

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npx prisma generate

RUN chmod +x ./wait-for-db.sh

CMD ["sh", "-c", "./wait-for-db.sh"]

EXPOSE 3001