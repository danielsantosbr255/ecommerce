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
    const { email, password } = authValidator.signIn(req.body);

    const ipAddress = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "Desconhecido";

    const session = await this.service.signIn({ email, password, userAgent, ipAddress });
    tokenUtil.setCookiesTokens(res, session.accessToken, session.refreshToken);

    res.json({ session });
  };

  signOut = async (req, res) => {
    const userId = req.user.id;
    const userAgent = req.headers["user-agent"] || "Desconhecido";

    try {
      await this.service.signOut({ userId, userAgent });
      tokenUtil.clearTokens(res);

      return res.status(200).json({ message: "Deslogado com sucesso" });
    } catch (error) {
      tokenUtil.clearTokens(res);
      throw new CustomError("Token inválido. Deslogado com sucesso", 401);
    }
  };

  refreshToken = async (req, res) => {
    const ipAddress = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "Desconhecido";
    const refreshToken = req.cookies.refreshToken;

    const session = await this.service.revalidateTokens({ req, refreshToken, userAgent, ipAddress });

    // console.log("⚙️ [CONTROLLER] - refresh session: ", session);
    tokenUtil.setCookiesTokens(res, session.accessToken, session.refreshToken);

    res.json({ session });
  };
}

module.exports = new AuthController();
