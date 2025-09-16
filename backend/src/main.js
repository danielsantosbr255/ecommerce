process.loadEnvFile();
require("express-async-errors");

const database = require("./common/database/database");
const { connectRedis } = require("./common/database/redis");

const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    await database.connect();
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
