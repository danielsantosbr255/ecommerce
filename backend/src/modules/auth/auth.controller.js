const service = require("./auth.service");
const tokenUtil = require("../../common/utils/token.util");
const CustomError = require("../../common/utils/CustomError");
const authValidator = require("../../common/validators/auth.validator");
const { getClientIp } = require("../../common/utils/getClientIp");

class AuthController {
  constructor() {
    this.service = service;
  }

  signUp = async (req, res) => {
    const validatedData = authValidator.signUp(req.body);
    const { name, email, password } = validatedData;

    const ipAddress = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "Desconhecido";

    const session = await this.service.signUp({ name, email, password, userAgent, ipAddress });

    tokenUtil.setCookiesTokens(res, session.accessToken, session.refreshToken);
    res.status(201).json({ session });
  };

  signIn = async (req, res) => {
    console.log("SignIn request body:", req.body);
    const { email, password } = authValidator.signIn(req.body);

    const ipAddress = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "Desconhecido";

    const session = await this.service.signIn({ email, password, userAgent, ipAddress });
    tokenUtil.setCookiesTokens(res, session.accessToken, session.refreshToken);

    res.json({ session });
  };

  signOut = async (req, res) => {
    const ability = req.ability;
    const userId = req.user.id;
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

    const session = await this.service.revalidateTokens({ req, refreshToken, userAgent, ipAddress });
    
    tokenUtil.setCookiesTokens(res, session.accessToken, session.refreshToken);

    res.json({ session });
  };
}

module.exports = new AuthController();
