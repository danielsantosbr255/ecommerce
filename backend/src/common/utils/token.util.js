const jwt = require("jsonwebtoken");
const cryptoUtil = require("./crypto.util");
const CustomError = require("./CustomError");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION || "15m";
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || "1d";

class TokenUtil {
  constructor() {}

  generateAccessToken = (payload) => {
    try {
      return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
    } catch (error) {
      throw new CustomError("Erro ao gerar accessToken", 500);
    }
  };

  generateRefreshToken = (payload) => {
    try {
      return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
    } catch (error) {
      throw new CustomError("Erro ao gerar refreshToken", 500);
    }
  };

  verifyJWT = (token, secret) => {
    if (!token) throw new CustomError("Token não fornecido!", 401);

    const decoded = jwt.verify(token, secret, (error, decoded) => {
      if (error) throw new CustomError("Token inválido!", 401);
      return decoded;
    });
    return decoded;
  };

  decodeJWT = (token) => {
    if (!token) throw new CustomError("Token não fornecido!", 401);
    return jwt.decode(token, { json: true });
  };

  createTokens = ({ userId, userAgent }) => {
    const ctx = cryptoUtil.encryptPayload({ userAgent });

    const accessToken = this.generateAccessToken({ ctx });
    const refreshToken = this.generateRefreshToken({ userId });

    return { accessToken, refreshToken };
  };

  clearTokens = (res) => {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
  };

  setCookiesTokens = (res, accessToken, refreshToken) => {
    this.clearTokens(res);

    if (!accessToken || !refreshToken) return;

    const { exp: accessTokenExpiredAt } = this.decodeJWT(accessToken);
    const { exp: refreshTokenExpiredAt } = this.decodeJWT(cryptoUtil.decryptData(refreshToken));

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
}

module.exports = new TokenUtil();
