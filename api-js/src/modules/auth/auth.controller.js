const service = require("./auth.service");
const userValidator = require("../../common/validators/user.validator");
const CustomError = require("../../common/utils/CustomError");
const tokenUtil = require("../../common/utils/token.util");

const signUp = async (req, res) => {
    const validatedData = userValidator.signUp(req.body);

    const { name, email, password } = validatedData;
    const userAgent = req.headers["user-agent"] || "Desconhecido";
    const ipAddress = req.ip;

    const result = await service.signUp(name, email, password, userAgent, ipAddress);
    tokenUtil.saveRefreshTokenToCookies(res, result.refreshToken);

    res.status(201).json({ accessToken: result.accessToken });
};

const signIn = async (req, res) => {
    const validatedData = userValidator.signIn(req.body);
    
    const { email, password } = validatedData;
    const userAgent = req.headers["user-agent"] || "Desconhecido";
    const ipAddress = req.ip;

    const result = await service.signIn(email, password, userAgent, ipAddress);
    tokenUtil.saveRefreshTokenToCookies(res, result.refreshToken);

    res.json({ accessToken: result.accessToken });
};

const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken)
    const userAgent = req.headers["user-agent"] || "Desconhecido";
    const ipAddress = req.ip;

    if (!refreshToken) throw new CustomError("Token inválido!", 401);

    const newTokens = await service.refreshAccessToken(refreshToken, userAgent, ipAddress);
    
    if (!newTokens) {
        tokenUtil.clearRefreshToken(res);
        throw new CustomError("Token inválido", 401);
    }

    tokenUtil.saveRefreshTokenToCookies(res, newTokens.refreshToken);

    res.json({ accessToken: newTokens.accessToken });
};

const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(204);

    const success = await service.logout(refreshToken);

    tokenUtil.clearRefreshToken(res);

    if (success) {
        return res.status(204).json("Logout bem-sucedido!"); // Logout bem-sucedido
    } else {
        return res.sendStatus(400); // Erro ao invalidar o token (pode não existir)
    }
};

module.exports = { signUp, signIn, logout, refreshToken };
