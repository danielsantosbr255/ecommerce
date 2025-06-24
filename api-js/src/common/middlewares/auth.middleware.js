const UAParser = require("ua-parser-js");
const { prisma } = require("../database/prisma");
const tokenUtil = require("../utils/token.util");
const cryptoUtil = require("../utils/crypto.util");
const CustomError = require("../utils/CustomError");
const { defineAbilitiesFor } = require("../utils/abilities.util");
// const { getLocationFromIP } = require("../utils/getLocationFromIP");

const verifyToken = async (req, res, next) => {
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"] || "Desconhecido";
  const accessToken = req.headers["authorization"]?.split(" ")[1];

  const ua = UAParser(userAgent);

  const sessionData = {
    ip: ipAddress,
    device: `${ua.device.vendor || ""} ${ua.device.model || ""}`.trim(),
    os: `${ua.os.name || ""} ${ua.os.version || ""}`.trim(),
    browser: `${ua.browser.name || ""} ${ua.browser.version || ""}`.trim(),
    // location: await getLocationFromIP(ipAddress),
  };

  console.log("💻[MD] sessionData: ", sessionData);

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
