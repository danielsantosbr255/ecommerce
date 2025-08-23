const service = require("./auth.service");
const tokenUtil = require("../../common/utils/token.util");
const { getClientIp } = require("../../common/utils/getClientIp");
const authValidator = require("../../common/validators/auth.validator");

class AuthController {
  constructor() {
    this.service = service;
  }

  signUp = async (req, res) => {
    const validatedData = authValidator.signUp(req.body);

    const ipAddress = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "Desconhecido";

    const user = await this.service.signUp(validatedData);
    const session = await this.service.createSession({ userId: user.id, userAgent, ipAddress });

    tokenUtil.setCookiesTokens(res, session.accessToken, session.refreshToken);

    res.status(201).json({ session });
  };

  signIn = async (req, res) => {
    const validatedData = authValidator.signIn(req.body);
    
    const ipAddress = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "Desconhecido";
    
    const user = await this.service.signIn(validatedData);
    const session = await this.service.createSession({ userId: user.id, userAgent, ipAddress });
    
    req.session.userId = user.id;
    tokenUtil.setCookiesTokens(res, session.accessToken, session.refreshToken);

    res.json({ session });
  };

  signOut = async (req, res) => {
    const ability = req.ability;
    const userId = req.userId;
    const userAgent = req.headers["user-agent"] || "Desconhecido";

    try {
      await this.service.signOut({ userId, userAgent, ability });
      tokenUtil.clearTokens(res);
    } catch (error) {
      tokenUtil.clearTokens(res);
      throw error;
    } finally {
      res.json({ message: "Deslogado com sucesso" });
    }
  };

  refreshToken = async (req, res) => {
    const ipAddress = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "Desconhecido";
    const refreshToken = req.cookies.refreshToken;

    const session = await this.service.revalidateTokens({ refreshToken, userAgent, ipAddress });

    tokenUtil.setCookiesTokens(res, session.accessToken, session.refreshToken);

    res.json({ session });
  };
}

module.exports = new AuthController();
