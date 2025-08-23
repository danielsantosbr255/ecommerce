require("express-async-errors");

const { connectDB } = require("./common/database/prisma");
const { connectRedis } = require("./common/database/redis");

const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB();
    await connectRedis();

    const app = require("./app.module");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

start();
