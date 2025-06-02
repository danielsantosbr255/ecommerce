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

  const { accessToken, refreshToken } = tokenUtil.createTokens({
    userId: user.id,
    userAgent,
    ipAddress,
  });

  return await repository.createSession({
    userId: user.id,
    accessToken,
    refreshToken,
    userAgent,
    ipAddress,
  });
};

const signIn = async ({ email, password, userAgent, ipAddress }) => {
  const user = await repository.findByEmail(email);

  if (!user || !(await authUtil.verifyPassword(password, user.password))) {
    throw new CustomError("Credenciais inválidas", 401);
  }

  const existingSession = await repository.findSession({ userId: user.id, userAgent, ipAddress });
  if (existingSession) await repository.deleteSession(existingSession.id);

  const { accessToken, refreshToken } = tokenUtil.createTokens({
    userId: user.id,
    userAgent,
    ipAddress,
  });

  return await repository.createSession({
    userId: user.id,
    accessToken,
    refreshToken,
    userAgent,
    ipAddress,
  });
};

const signOut = async ({ userId, refreshToken, userAgent, ipAddress }) => {
  if (!refreshToken) throw new CustomError("Token de sign out não fornecido", 404);

  const session = await repository.findSession({ userId, refreshToken, userAgent, ipAddress });

  if (session) {
    await repository.deleteSession(session.id);
  }
  return true;
};

const revalidateTokens = async ({ refreshToken, userAgent, ipAddress }) => {
  if (!refreshToken) {
    throw new CustomError("Token de atualização nao fornecido", 401);
  }

  const decrypted = cryptoUtil.decryptData(refreshToken);
  const { userId } = tokenUtil.decodeJWT(decrypted);

  const session = await repository.findSession({ userId, refreshToken, userAgent, ipAddress });

  console.log(
    "👷 [SERVICE] - session: ",
    `UID: ${userId}`,
    `RFT: ${refreshToken}`,
    `UAG: ${userAgent}`,
    `IP: ${ipAddress}`
  );

  if (!session || session.expiresAt < new Date()) {
    if (session) await deleteSession(session.id);
    throw new CustomError("Sessão inválida ou expirada", 401);
  }

  const newTokens = tokenUtil.createTokens({ userId, userAgent, ipAddress });

  return await repository.createSession({
    userId,
    accessToken: newTokens.accessToken,
    refreshToken: newTokens.refreshToken,
    userAgent,
    ipAddress,
  });
};

module.exports = { signUp, signIn, signOut, revalidateTokens };
