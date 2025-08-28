const service = require("./auth.service");
const tokenUtil = require("../../common/utils/token.util");
const CustomError = require("../../common/utils/CustomError");
const { getClientIp } = require("../../common/utils/getClientIp");
const { getUserAgent } = require("../../common/utils/userAgent.util");
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
    const ua = getUserAgent(req.headers["user-agent"] || "Desconhecido");

    const user = await this.service.signIn(validatedData);

    req.session.userId = user.id;
    req.session.roles = user.roles.map((role) => role.role.name);
    req.session.os = ua.os;
    req.session.browser = ua.browser;
    req.session.device = ua.device;
    req.session.ipAddress = ipAddress;

    res.json({ session: req.session });
  };

  signOut = async (req, res) => {
    req.session.destroy((err) => {
      if (err) throw new CustomError("Failed to logout", 500);
      res.clearCookie("sid", { domain: process.env.COOKIE_DOMAIN, httpOnly: true });
      res.clearCookie("_csrf");
      res.json({ message: "Deslogado com sucesso" });
    });
  };

  refreshToken = async (req, res) => {
    const ipAddress = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "Desconhecido";
    const refreshToken = req.cookies.refreshToken;

    const session = await this.service.revalidateTokens({ refreshToken, userAgent, ipAddress });

    tokenUtil.setCookiesTokens(res, session.accessToken, session.refreshToken);

    res.json({ session });
  };

  getCSRFToken = (req, res) => {
    console.log(req.csrfToken());
    res.json({ csrfToken: req.csrfToken() });
  };
}

module.exports = new AuthController();
