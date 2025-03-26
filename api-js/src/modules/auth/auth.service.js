const tools = require("../../config/utils/Tools");
const { prisma } = require("../../config/database/prisma");
const CustomError = require("../../config/utils/CustomError");

module.exports = {
    async signUp(userData) {
        let { name, email, password } = userData;

        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) throw new CustomError("Este usuário já existe!", 500);

        password = await tools.hashPassword(password);

        const user = await prisma.user.create({ data: { name, email, password } });
        const token = tools.generateToken({ id: user.id, role: user.role });

        return { user, token };
    },

    async signIn(body) {
        const { email, password } = body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("Usuário não encontrado");

        const matchPassword = await tools.verifyPassword(password, user.password);
        if (!matchPassword) throw new Error("Email ou Senhs Inválidos");

        const token = tools.generateToken({ id: user.id, role: user.role });
        return token;
    },
};
