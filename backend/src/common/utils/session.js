const crypto = require("crypto");
const redis = require("redis");

// Configuração do cliente Redis (ajuste para sua URL de produção)
const redisClient = redis.createClient();
redisClient.on("error", (err) => console.error("Erro no Redis:", err));
(async () => {
  await redisClient.connect();
})();

// Configurações de sessão
const SESSION_COOKIE_NAME = "sid";
const SESSION_TTL_SECONDS = 3600; // 1 hora, ajustável
const SESSION_SECRET = "sua-chave-secreta-aqui"; // Para futura assinatura se necessário

// Função para gerar ID de sessão único
function generateSessionId() {
  return crypto.randomBytes(32).toString("hex");
}

// Função para criar uma nova sessão após login bem-sucedido
async function createSession(req, res, userId) {
  const sessionId = generateSessionId();

  // Coleta dados mínimos: userId, ip, userAgent, createdAt, lastAccess
  const sessionData = {
    userId,
    ip: req.ip || req.headers["x-forwarded-for"] || "unknown",
    userAgent: req.headers["user-agent"] || "unknown",
    createdAt: Date.now(),
    lastAccess: Date.now(),
  };

  // Armazena a sessão no Redis (dados mínimos para economia de memória)
  await redisClient.set(`session:${sessionId}`, JSON.stringify(sessionData), { EX: SESSION_TTL_SECONDS });

  // Adiciona ao índice de sessões do usuário (usando Redis Set para lista de sessionIds)
  await redisClient.sAdd(`user:sessions:${userId}`, sessionId);

  // Define o cookie de sessão
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE_NAME}=${sessionId}; HttpOnly; Path=/; Max-Age=${SESSION_TTL_SECONDS}; SameSite=Strict`
  ); // Adicione Secure; para HTTPS

  // Anexa à req para uso imediato na requisição atual
  req.session = sessionData;
  req.sessionId = sessionId;

  return sessionId;
}

// Middleware de sessões: Carrega sessão existente, mas não cria nova (criação só no login)
async function sessionMiddleware(req, res, next) {
  const cookies = req.headers.cookie
    ? req.headers.cookie.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
      }, {})
    : {};

  const sessionId = cookies[SESSION_COOKIE_NAME];
  req.session = null;
  req.sessionId = null;

  if (sessionId) {
    const sessionData = await redisClient.get(`session:${sessionId}`);
    if (sessionData) {
      req.session = JSON.parse(sessionData);
      req.sessionId = sessionId;

      // Atualiza lastAccess e renova TTL
      req.session.lastAccess = Date.now();
      await redisClient.set(`session:${sessionId}`, JSON.stringify(req.session), { EX: SESSION_TTL_SECONDS });

      // Salva ao final da resposta (caso haja mudanças)
      res.on("finish", async () => {
        await redisClient.set(`session:${sessionId}`, JSON.stringify(req.session), { EX: SESSION_TTL_SECONDS });
      });
    }
  }

  next();
}

// Função para listar sessões de um usuário (para painel de controle)
async function getSessionsForUser(userId) {
  const sessionIds = await redisClient.sMembers(`user:sessions:${userId}`);
  const sessions = [];

  for (const sid of sessionIds) {
    const data = await redisClient.get(`session:${sid}`);
    if (data) {
      sessions.push({ sessionId: sid, ...JSON.parse(data) });
    } else {
      // Remove sessionId inválido do set
      await redisClient.sRem(`user:sessions:${userId}`, sid);
    }
  }

  return sessions;
}

// Função para revogar uma sessão específica
async function revokeSession(userId, sessionId) {
  await redisClient.del(`session:${sessionId}`);
  await redisClient.sRem(`user:sessions:${userId}`, sessionId);
}

// Função para revogar todas as sessões de um usuário (ex: logout all devices)
async function revokeAllSessions(userId) {
  const sessionIds = await redisClient.sMembers(`user:sessions:${userId}`);
  for (const sid of sessionIds) {
    await redisClient.del(`session:${sid}`);
  }
  await redisClient.del(`user:sessions:${userId}`);
}

module.exports = {
  sessionMiddleware,
  createSession,
  getSessionsForUser,
  revokeSession,
  revokeAllSessions,
};
