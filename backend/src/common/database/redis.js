const Redis = require("ioredis");
const { createClient } = require("redis");

let redis;

const connectRedis = async () => {
  if (redis) return redis;

  if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
    throw new Error("Variáveis de ambiente REDIS_HOST e REDIS_PORT são necessárias.");
  }

  // redis = new Redis({
  //   host: process.env.REDIS_HOST,
  //   port: process.env.REDIS_PORT,
  //   password: process.env.REDIS_PASSWORD,
  // });

  redis = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });

  await redis.connect();
  console.log("🏦 Conectado ao Redis com sucesso!");


  redis.on("connect", () => {
    console.log("✅ Conectado ao Redis com sucesso!");
  });

  redis.on("error", (err) => {
    console.error("❌ Erro no Redis:", err);
  });
};

const getRedis = () => {
  if (!redis) {
    throw new Error("Redis não inicializado. Chame connectRedis() primeiro.");
  }
  return redis;
};

module.exports = { connectRedis, getRedis };
