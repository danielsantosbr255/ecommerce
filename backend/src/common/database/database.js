const { PrismaClient } = require("@prisma/client");

class Database {
  constructor() {
    this.prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
  }

  async connect() {
    try {
      await this.prisma.$connect();
      console.log("✅ Banco de dados conectado com sucesso");
    } catch (error) {
      console.error("❌ Erro ao conectar com banco de dados:", error);
      process.exit(1);
    }
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }

  getClient() {
    return this.prisma;
  }
}

module.exports = new Database();
