FROM node:22.16.0-alpine

WORKDIR /api

COPY package*.json ./

RUN npm install --production

COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Dá permissão ao script de espera do banco
RUN chmod +x ./wait-for-db.sh

# Define o comando padrão via docker-compose
CMD ["sh", "-c", "./wait-for-db.sh"]

EXPOSE 3001