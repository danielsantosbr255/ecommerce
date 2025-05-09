const dayjs = require("dayjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const CustomError = require("./CustomError");
const { prisma } = require("../database/prisma");

require("dayjs/plugin/duration");
dayjs.extend(require("dayjs/plugin/duration"));

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "seu_segredo_super_secreto_access";
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION || "15m"; // Exemplo: 15 minutos
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || "1 day"; // Exemplo: 1 dia

const generateAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
};

const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

const verifyAccessToken = (token, secret) => {
  if (!token) throw new CustomError("Token não fornecido!", 403);

  const decoded = jwt.verify(token, secret, (error, decoded) => {
    if (error) throw new CustomError("Token inválido!", 403);
    return decoded;
  });
  return decoded;
};

const saveRefreshTokenToDatabase = async (userId, refreshToken, userAgent, ipAddress) => {
  const [valueStr, unit] = REFRESH_TOKEN_EXPIRATION.split(" ");
  const expiresAt = dayjs().add(parseInt(valueStr), unit.toLowerCase()).toDate();

  try {
    const session = await prisma.session.upsert({
      where: { userId_userAgent_ipAddress: { userId, userAgent, ipAddress } },
      update: { refreshToken },
      create: { userId, refreshToken, userAgent, ipAddress, expiresAt },
    });
    return session;
  } catch (error) {
    console.error("Erro ao salvar/atualizar refreshToken no banco (upsert):", error);
    return null;
  }
};

const saveRefreshTokenToCookies = (res, refreshToken) => {
  const [valueStr, unit] = REFRESH_TOKEN_EXPIRATION.split(" ");
  const duration = dayjs.duration(parseInt(valueStr), unit.toLowerCase());

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: duration.asMilliseconds(),
  });
};

const clearRefreshToken = (res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

const findSessionByRefreshToken = async (refreshToken) => {
  try {
    return await prisma.session.findFirst({ where: { refreshToken }, include: { user: true } });
  } catch (error) {
    console.error("Erro ao buscar sessão por refreshToken:", error);
    return null;
  }
};

const deleteSession = async (sessionId) => {
  try {
    await prisma.session.delete({ where: { id: sessionId } });
  } catch (error) {
    console.error("Erro ao deletar sessão:", error);
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  saveRefreshTokenToDatabase,
  saveRefreshTokenToCookies,
  findSessionByRefreshToken,
  clearRefreshToken,
  deleteSession,
};
