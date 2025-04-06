const { defineAbilitiesFor } = require("../utils/abilities");
const { prisma } = require("../database/prisma");
const tools = require("../utils/Tools");
const CustomError = require("../utils/CustomError");

module.exports = {
    async verifyToken(req, res, next) {
        const token = req.headers.authorization?.split(" ");

        if (!token || token[0] !== "Bearer" || !token[1]) {
            throw new CustomError("Acesso negado!", 403);
        }

        const decoded = tools.verifyToken(token[1], process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            throw new CustomError("Usuário não encontrado!", 404);
        }

        req.user = user;
        req.ability = defineAbilitiesFor(user);
        next();
    },
};
true;
