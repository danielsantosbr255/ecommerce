const service = require("./auth.service");
const userValidator = require("../../common/validators/user.validator");

const authController = {
    async signUp(req, res) {
        const validatedData = userValidator.signUp(req.body);
        const user = await service.signUp(validatedData);
        res.status(201).json(user);
    },

    async signIn(req, res) {
        const validatedData = userValidator.signIn(req.body);
        const token = await service.signIn(validatedData);
        res.json({ token });
    },
};

module.exports = authController;
