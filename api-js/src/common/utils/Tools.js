const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const CustomError = require("./CustomError");
const crypto = require("crypto");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRES = '15m';
const REFRESH_TOKEN_EXPIRES_SECONDS = 7 * 24 * 60 * 60; // 7 dias

exports.generateToken = (user) =>{
    const accessToken = jwt.sign({ id: user.id, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_SECONDS });
    return { accessToken, refreshToken };
}

exports.hashToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
};

exports.saveRefreshToken = async(userId, token, ip, userAgent) => {
    const now = new Date().toISOString();
  
    const data = {
      token,
      ip,
      userAgent,
      createdAt: now,
      updatedAt: now,
    };
  
    await client.set(key, JSON.stringify(data), { EX: REFRESH_TOKEN_EXPIRES_SECONDS });
  }

exports.verifyToken = (token, secret) =>{
    if (!token) throw new CustomError("Token não fornecido!", 403);

    const decoded = jwt.verify(token, secret, (error, decoded) => {
        if (error) throw new CustomError("Token inválido!", 403);
        return decoded;
    });
    return decoded;
}

exports.verifyPassword = (password, cryptPassword) =>{
    return bcrypt.compare(password, cryptPassword);
}

exports.hashPassword = (password) =>{
    return bcrypt.hash(password, 10);
}

