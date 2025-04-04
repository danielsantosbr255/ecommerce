const service = require("./auth.service");
const userValidator = require("../../common/validators/user.validator");

const authController = {
    async signUp(req, res) {
        const validatedData = userValidator.signUp(req.body);
        const { token, refreshToken } = await service.signUp(validatedData);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.status(201).json({ token });
    },

    async signIn(req, res) {
        const validatedData = userValidator.signIn(req.body);
        const { token, refreshToken } = await service.signIn(validatedData);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.json({ token });
    },

    refreshToken(req, res) {
        const { refreshToken } = req.cookies;
        const newToken = service.refreshToken(refreshToken);
        res.json({ token: newToken });
    },

    logout(req, res) {
        res.clearCookie('refreshToken');
        res.json({ message: 'Sessão encerrada com sucesso' });
    },
};

module.exports = authController;
