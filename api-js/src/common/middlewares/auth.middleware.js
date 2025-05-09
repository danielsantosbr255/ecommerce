const { defineAbilitiesFor } = require("../utils/abilities.util");
const { prisma } = require("../database/prisma");
const CustomError = require("../utils/CustomError");

const verifyToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("refreshToken", refreshToken);

  if (!refreshToken) throw new CustomError("Acesso negado!", 401);

  const session = await prisma.session.findFirst({
    where: { refreshToken },
    include: { user: true },
  });

  if (!session) throw new CustomError("Acesso negado!", 401);
  if (session.expiresAt < new Date()) throw new CustomError("Acesso negado!", 401);

  const user = session.user;

  if (!user) throw new CustomError("Acesso negado!", 401);

  req.user = user;
  req.ability = defineAbilitiesFor(user);
  next();
};

module.exports = { verifyToken };
