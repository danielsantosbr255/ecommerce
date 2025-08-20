const { prisma } = require("../database/prisma");
const tokenUtil = require("../utils/token.util");
const cryptoUtil = require("../utils/crypto.util");
const CustomError = require("../utils/CustomError");
const { defineAbilityFor } = require("../utils/ability");

const verifyToken = async (req, res, next) => {
  const userAgent = req.headers["user-agent"] || "Desconhecido";
  const accessToken = req.headers["authorization"]?.split(" ")[1];

  if (!accessToken) throw new CustomError("Token não fornecido!", 401);

  const decodedAccessToken = tokenUtil.verifyJWT(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const encryptedPayload = cryptoUtil.encryptPayload({ userAgent });

  if (decodedAccessToken.ctx !== encryptedPayload) {
    console.error("❌ context not match");
    throw new CustomError("Acesso negado!", 401);
  }

  const session = await prisma.session.findFirst({
    where: { accessToken, userAgent },
    include: {
      user: {
        include: { roles: { include: { role: { include: { permissions: { include: { permission: true } } } } } } },
        omit: { password: true },
      },
    },
  });

  if (!session || session.expiresAt < new Date()) {
    throw new CustomError("Acesso negado!", 401);
  }

  req.user = session.user;
  req.ability = defineAbilityFor(session.user);

  next();
};

module.exports = { verifyToken };
