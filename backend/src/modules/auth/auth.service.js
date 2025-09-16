const repository = require("./auth.repository");
const tokenUtil = require("../../common/utils/token.util");
const cryptoUtil = require("../../common/utils/crypto.util");
const CustomError = require("../../common/utils/CustomError");
const { getUserAgent } = require("../../common/utils/user-agent.util");
const { getLocationFromIP } = require("../../common/utils/location.util");

class AuthService {
  constructor() {
    this.repository = repository;
  }

  async signUp({ name, email, password }) {
    const userExists = await this.repository.findByEmail(email);
    if (userExists) throw new CustomError("Este usuário já existe!", 400);

    const hashedPassword = await cryptoUtil.hashPassword(password);
    return await this.repository.createUser({ name, email, password: hashedPassword });
  }

  async signIn({ email, password }) {
    const user = await this.repository.findByEmail(email);

    if (!user || !(await cryptoUtil.verifyPassword(password, user.password))) {
      throw new CustomError("Credenciais inválidas", 401);
    }

    return user;
  }

  async signOut({ userId, userAgent }) {
    const session = await this.repository.getSessionByUserId({ userId, userAgent });
    if (session) await this.repository.deleteSession(session.id);
    return true;
  }

  async createSession({ userId, userAgent, ipAddress }) {
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

  async revalidateTokens({ refreshToken, userAgent, ipAddress }) {
    if (!refreshToken) throw new CustomError("Token de atualização nao fornecido", 401);

    const decrypted = cryptoUtil.decryptData(refreshToken);
    const { userId } = tokenUtil.decodeJWT(decrypted);

    const session = await this.repository.getSessionByUserId({ userId, userAgent });

    if (!session || session.expiresAt < new Date()) {
      if (session) await this.repository.deleteSession(session.id);
      throw new CustomError("Sessão inválida ou expirada", 401);
    }
    console.log("[REVALIDATE] - Atualizando sessão...");

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
