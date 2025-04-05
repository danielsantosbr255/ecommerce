const CustomError = require("../../common/utils/CustomError");
const { prisma } = require("../../common/database/prisma");
const tools = require("../../common/utils/tools");

module.exports = {
    async getUsers() {
        return await prisma.user.findMany();
    },

    async getUserById(id) {
        const user = await prisma.user.findUnique({ where: { id }, omit: { password: true } });
        if (!user) throw new CustomError("Usuário não encontrado", 404);
        return user;
    },

    async updateUser(id, userData) {
        const { name, email, password, role } = userData;

        const user = await prisma.user.findUnique({
            where: { id },
            select: { id: true, name: true, email: true, password: true, role: true },
        });

        if (!user) throw new CustomError("Usuário não encontrado", 404);

        if (email && email !== user.email) {
            const existingEmail = await prisma.user.findUnique({ where: { email } });
            if (existingEmail) throw new CustomError("Email já cadastrado.", 400);
        }

        if (password && (await tools.verifyPassword(password, user.password))) {
            throw new CustomError("A senha não pode ser igual", 400);
        }

        if (role && role === user.role)
            throw new CustomError(`O usuário ${user.name} já é ${role}`, 400);

        // Atualiza o usuário
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                name: name || user.name,
                email: email || user.email,
                password: password ? await tools.hashPassword(password, 10) : user.password,
                role: role || user.role,
            },
        });

        return { message: "Usuário atualizado com sucesso", user: updatedUser };
    },

    async deleteUser(id) {
        const user = await prisma.user.delete({ where: { id } });
        if (!user) throw new CustomError("Usuário não encontrado", 404);
        return user;
    },
};
