const { defineAbilitiesFor } = require("../utils/abilities.util");
const { prisma } = require("../database/prisma");
const tokenUtil = require("../utils/token.util");
const CustomError = require("../utils/CustomError");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ");

  if (!token || token[0] !== "Bearer" || !token[1]) {
    throw new CustomError("Acesso negado!", 401);
  }

  const decoded = tokenUtil.verifyAccessToken(token[1], process.env.ACCESS_TOKEN_SECRET);

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!user) {
    throw new CustomError("Usuário não encontrado!", 404);
  }

  req.user = user;
  req.ability = defineAbilitiesFor(user);
  next();
};

module.exports = { verifyToken };
