const tools = require("../../common/utils/Tools");
const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");

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
        if (!user) throw new CustomError("Usuário não encontrado", 404);

        const matchPassword = await tools.verifyPassword(password, user.password);
        if (!matchPassword) throw new CustomError("Email ou Senha Inválidos", 403);

        const token = tools.generateToken({ id: user.id, role: user.role });
        return token;
    },
};
