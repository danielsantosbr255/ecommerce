const { prisma } = require("../database/prisma");
const authUtil = require("../utils/auth.util");
const tokenUtil = require("../utils/token.util");
const cryptoUtil = require("../utils/crypto.util");
const CustomError = require("../utils/CustomError");
const { defineAbilitiesFor } = require("../utils/abilities.util");

const verifyToken = async (req, res, next) => {
  const realIp = req.headers["x-forwarded-for"] || req.ip;
  const userAgent = req.headers["user-agent"] || "Desconhecido";
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  // const refreshToken = req.cookies.refreshToken;

  const ipAddress = authUtil.normalizeIp(realIp);

  // console.log("🚨 [MD] accessToken: ", accessToken);
  // console.log("🚨 [MD] refreshToken: ", refreshToken);
  console.log("🚨 [MD] userAgent: ", userAgent);
  console.log("🚨 [MD] ipAddress: ", ipAddress);

  if (!accessToken) {
    throw new CustomError("Token não fornecido!", 401);
  }

  const decodedAccessToken = tokenUtil.verifyJWT(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const encryptedPayload = cryptoUtil.encryptPayload({ userAgent, ipAddress });

  if (decodedAccessToken.ctx !== encryptedPayload) {
    console.error("❌ context not match");
    throw new CustomError("Acesso negado!", 401);
  } else {
    console.log("✅ matched context");
  }

  const session = await prisma.session.findFirst({
    where: { accessToken, userAgent, ipAddress },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    throw new CustomError("Acesso negado!", 401);
  }

  req.user = session.user;
  req.ability = defineAbilitiesFor(session.user);

  next();
};

module.exports = { verifyToken };
