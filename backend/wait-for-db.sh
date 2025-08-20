#!/bin/sh

echo "⏳ Aguardando o banco de dados iniciar..."

until nc -z db 5432; do
  sleep 1
done

echo "✅ Banco de dados disponível! Aplicando migrations..."

npx prisma migrate dev --name init

echo "🚀 Iniciando a aplicação..."
npm run start
