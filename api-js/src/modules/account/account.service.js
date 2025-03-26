const CustomError = require("../../config/utils/CustomError");
const { prisma } = require("../../config/database/prisma");

module.exports = {
    async getProfile(id) {
        const user = await prisma.user.findUnique({ where: { id }, omit: { password: true } });
        if (!user) throw new CustomError("Usuário não encontrado!", 404);
        return user;
    },
};
