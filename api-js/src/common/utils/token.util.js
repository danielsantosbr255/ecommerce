const jwt = require("jsonwebtoken");
const cryptoUtil = require("./crypto.util");
const CustomError = require("./CustomError");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "seu_segredo_super_secreto_access";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "seu_segredo_super_secreto_refresh";
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION || "15m"; // Exemplo: 15 minutos
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || "1d"; // Exemplo: 1 dia

const generateAccessToken = (payload) => {
  try {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
  } catch (error) {
    throw new CustomError("Erro ao gerar accessToken", 500);
  }
};

const generateRefreshToken = (payload) => {
  try {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
  } catch (error) {
    throw new CustomError("Erro ao gerar refreshToken", 500);
  }
};

const verifyJWT = (token, secret) => {
  if (!token) throw new CustomError("Token não fornecido!", 401);

  const decoded = jwt.verify(token, secret, (error, decoded) => {
    if (error) throw new CustomError("Token inválido!", 401);
    return decoded;
  });
  return decoded;
};

const decodeJWT = (token) => {
  if (!token) throw new CustomError("Token não fornecido!", 401);
  return jwt.decode(token, { json: true });
};

const createTokens = ({ userId, userAgent, ipAddress }) => {
  const ctx = cryptoUtil.encryptPayload({ userAgent, ipAddress });

  const accessToken = generateAccessToken({ ctx });
  const refreshToken = generateRefreshToken({ userId });

  return { accessToken, refreshToken };
};

const clearTokens = (res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
};

const setCookiesTokens = (res, accessToken, refreshToken) => {
  clearTokens(res);

  if (!accessToken || !refreshToken) return;

  console.log("🚨 [TKU] accessToken: ", accessToken);
  console.log("🚨 [TKU] refreshToken: ", refreshToken);

  const { exp: accessTokenExpiredAt } = decodeJWT(accessToken);
  const { exp: refreshTokenExpiredAt } = decodeJWT(cryptoUtil.decryptData(refreshToken));

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(accessTokenExpiredAt * 1000),
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(refreshTokenExpiredAt * 1000),
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyJWT,
  createTokens,
  clearTokens,
  decodeJWT,
  setCookiesTokens,
};
