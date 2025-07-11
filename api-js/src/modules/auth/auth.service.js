const repository = require("./auth.repository");
const authUtil = require("../../common/utils/auth.util");
const tokenUtil = require("../../common/utils/token.util");
const cryptoUtil = require("../../common/utils/crypto.util");
const CustomError = require("../../common/utils/CustomError");
const { getUserAgent } = require("../../common/utils/userAgent.util");
const getLocationFromIP = require("../../common/utils/getLocationFromIP");

class AuthService {
  constructor() {
    this.repository = repository;
  }

  async signUp({ name, email, password, userAgent, ipAddress }) {
    const userExists = await this.repository.findByEmail(email);
    if (userExists) throw new CustomError("Este usuário já existe!", 400);

    hashedPassword = await authUtil.hashPassword(password);
    const user = await this.repository.createUser({ name, email, password: hashedPassword });
    const userId = user.id;

    let { accessToken, refreshToken } = tokenUtil.createTokens({ userId, userAgent });

    const expiresAt = new Date(tokenUtil.decodeJWT(refreshToken).exp * 1000);
    refreshToken = cryptoUtil.encryptData(refreshToken);

    const ua = getUserAgent(userAgent);
    const locationData = await getLocationFromIP(ipAddress);
    const location = locationData ? `${locationData.city}, ${locationData.region}, ${locationData.country}` : "";

    return await this.repository.createSession({
      userId,
      accessToken,
      refreshToken,
      ipAddress,
      userAgent,
      os: ua.os,
      browser: ua.browser,
      device: ua.device,
      location,
      expiresAt,
    });
  }

  async signIn({ email, password, userAgent, ipAddress }) {
    const user = await this.repository.findByEmail(email);

    if (!user || !(await authUtil.verifyPassword(password, user.password))) {
      throw new CustomError("Credenciais inválidas", 401);
    }

    const userId = user.id;

    const existingSession = await this.repository.getSessionByUserId({ userId, userAgent });
    if (existingSession) await this.repository.deleteSessionByAgent({ userId, userAgent });

    let { accessToken, refreshToken } = tokenUtil.createTokens({ userId, userAgent });

    const expiresAt = new Date(tokenUtil.decodeJWT(refreshToken).exp * 1000);
    refreshToken = cryptoUtil.encryptData(refreshToken);

    const ua = getUserAgent(userAgent);
    const locationData = await getLocationFromIP(ipAddress);
    const location = locationData ? `${locationData.city}, ${locationData.region}, ${locationData.country}` : "";

    return await this.repository.createSession({
      userId,
      accessToken,
      refreshToken,
      ipAddress,
      userAgent,
      os: ua.os,
      browser: ua.browser,
      device: ua.device,
      location,
      expiresAt,
    });
  }

  async signOut({ userId, userAgent, ability }) {
    const session = await this.repository.getSessionByUserId({ userId, userAgent });
    if (session) await this.repository.deleteSession(session.id, ability);
    return true;
  }

  async revalidateTokens({ req, refreshToken, userAgent, ipAddress }) {
    if (!refreshToken) throw new CustomError("Token de atualização nao fornecido", 401);

    const decrypted = cryptoUtil.decryptData(refreshToken);
    const { userId } = tokenUtil.decodeJWT(decrypted);

    const session = await this.repository.getSessionByUserId({ userId, userAgent });

    if (!session || session.expiresAt < new Date()) {
      if (session) await this.repository.deleteSession(req, session.id);
      throw new CustomError("Sessão inválida ou expirada", 401);
    }

    const newTokens = tokenUtil.createTokens({ userId, userAgent });
    const ua = getUserAgent(userAgent);

    return await this.repository.updateSession(session.id, {
      accessToken: newTokens.accessToken,
      refreshToken: cryptoUtil.encryptData(newTokens.refreshToken),
      ipAddress,
      userAgent,
      os: ua.os,
      browser: ua.browser,
      device: ua.device,
    });
  }
}

module.exports = new AuthService();
