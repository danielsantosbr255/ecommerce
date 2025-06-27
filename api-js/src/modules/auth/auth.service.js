const UAParser = require("ua-parser-js");
const repository = require("./auth.repository");
const authUtil = require("../../common/utils/auth.util");
const tokenUtil = require("../../common/utils/token.util");
const cryptoUtil = require("../../common/utils/crypto.util");
const CustomError = require("../../common/utils/CustomError");

const signUp = async ({ name, email, password, userAgent, ipAddress }) => {
  const userExists = await repository.findByEmail(email);
  if (userExists) throw new CustomError("Este usuário já existe!", 400);

  hashedPassword = await authUtil.hashPassword(password);
  const user = await repository.createUser({ name, email, password: hashedPassword });
  const userId = user.id;

  let { accessToken, refreshToken } = tokenUtil.createTokens({ userId, userAgent });

  const expiresAt = new Date(tokenUtil.decodeJWT(refreshToken).exp * 1000);
  refreshToken = cryptoUtil.encryptData(refreshToken);

  return await repository.createSession({ userId, accessToken, refreshToken, userAgent, ipAddress, expiresAt });
};

const signIn = async ({ email, password, userAgent, ipAddress }) => {
  const user = await repository.findByEmail(email);

  if (!user || !(await authUtil.verifyPassword(password, user.password))) {
    throw new CustomError("Credenciais inválidas", 401);
  }

  const userId = user.id;
  const ua = UAParser(userAgent);

  const sessionData = {
    ip: ipAddress,
    device: `${ua.device.vendor || ""} ${ua.device.model || ""}`.trim(),
    os: `${ua.os.name || ""} ${ua.os.version || ""}`.trim(),
    browser: `${ua.browser.name || ""} ${ua.browser.version || ""}`.trim(),
  };

  const existingSession = await repository.getSessionByUserId({ userId, userAgent });
  if (existingSession) await repository.deleteSessionByAgent({ userId, userAgent });

  let { accessToken, refreshToken } = tokenUtil.createTokens({ userId, userAgent });

  const expiresAt = new Date(tokenUtil.decodeJWT(refreshToken).exp * 1000);
  refreshToken = cryptoUtil.encryptData(refreshToken);

  return await repository.createSession({ userId, accessToken, refreshToken, userAgent, ipAddress, expiresAt });
};

const signOut = async ({ userId, userAgent }) => {
  const session = await repository.getSessionByUserId({ userId, userAgent });
  if (session) await repository.deleteSession(session.id);
  return true;
};

const revalidateTokens = async ({ req, refreshToken, userAgent, ipAddress }) => {
  if (!refreshToken) throw new CustomError("Token de atualização nao fornecido", 401);

  const decrypted = cryptoUtil.decryptData(refreshToken);
  const { userId } = tokenUtil.decodeJWT(decrypted);

  const session = await repository.getSessionByUserId({ userId, userAgent });

  if (!session || session.expiresAt < new Date()) {
    if (session) await repository.deleteSession(req, session.id);
    throw new CustomError("Sessão inválida ou expirada", 401);
  }

  const newTokens = tokenUtil.createTokens({ userId, userAgent });
  const expiresAt = new Date(tokenUtil.decodeJWT(newTokens.refreshToken).exp * 1000);

  return await repository.createSession({
    userId,
    accessToken: newTokens.accessToken,
    refreshToken: cryptoUtil.encryptData(newTokens.refreshToken),
    userAgent,
    ipAddress,
    expiresAt,
  });
};

module.exports = { signUp, signIn, signOut, revalidateTokens };
