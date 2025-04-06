const service = require("./user.service");
const dataValidator = require("../../common/validators/user.validator");
const CustomError = require("../../common/utils/CustomError");

module.exports = {
    async getUsers(req, res) {
        if (!req.ability.can("read", "User")) throw new CustomError("Acesso negado!", 403);

        const users = await service.getUsers();
        return res.json(users);
    },

    async getUserById(req, res) {
        if (!req.ability.can("read", "User")) throw new CustomError("Acesso negado!", 403);

        const user = await service.getUserById(req.params.id);
        return res.json(user);
    },

    async updateUser(req, res) {
        if (!req.ability.can("manage", "User")) throw new CustomError("Acesso negado!", 403);

        const validateData = dataValidator.update(req.body);
        const updatedUser = await service.updateUser(req.params.id, validateData);
        return res.json(updatedUser);
    },

    async deleteUser(req, res) {
        if (!req.ability.can("manage", "User")) throw new CustomError("Acesso negado!", 403);

        const user = await service.deleteUser(req.params.id);
        return res.json({ message: "Usuário deletado com sucesso", user });
    },

    // MY ACCOUNT
    async getMyProfile(req, res) {
        const user = await service.getUserById(req.user.id);
        return res.json({ user });
    },

    async updateMyProfile(req, res) {
        const validatedData = dataValidator.updateProfile(req.body);
        const updatedUser = await service.updateUser(req.user.id, validatedData);
        return res.json(updatedUser);
    },

    async deleteMyAccount(req, res) {
        const user = await service.deleteUser(req.user.id);
        return res.json({ message: "Usuário deletado com sucesso", user });
    },
};
