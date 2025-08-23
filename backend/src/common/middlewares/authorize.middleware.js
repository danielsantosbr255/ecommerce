const CustomError = require("../utils/CustomError");
const { defineAbilitiesFor } = require("../config/ability");
const { prisma } = require("../database/prisma");

const authorize = (action, subject, condition) => {
  return async (req, res, next) => {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: { roles: { include: { role: { include: { permissions: { include: { permission: true } } } } } } },
    });
    
    const ability = defineAbilitiesFor(user);

    if (!ability.can(action, subject, condition)) {
      throw new CustomError("Você não tem permissão para isso!", 403);
    }

    next();
  };
};

module.exports = { authorize };
