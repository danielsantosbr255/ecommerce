const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Conectado ao banco com Prisma");
  } catch (error) {
    console.error("❌ Erro ao conectar-se ao banco:", error);
    process.exit(1);
  }
};

module.exports = { prisma, connectDB };
