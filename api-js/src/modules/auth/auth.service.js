const authUtil = require("../../common/utils/auth.util");
const tokenUtil = require("../../common/utils/token.util");
const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");

const signUp = async (name, email, password, userAgent, ipAddress) => {
  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) throw new CustomError("Este usuário já existe!", 400);

  password = await authUtil.hashPassword(password);
  const user = await prisma.user.create({ data: { name, email, password } });

  const accessToken = tokenUtil.generateAccessToken({ id: user.id, role: user.role });
  const refreshToken = tokenUtil.generateRefreshToken();

  await tokenUtil.saveRefreshTokenToDatabase(user.id, refreshToken, userAgent, ipAddress);

  return { user, accessToken, refreshToken };
};

const signIn = async (email, password, userAgent, ipAddress) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await authUtil.verifyPassword(password, user.password))) {
    throw new CustomError("Credenciais inválidas", 401);
  }

  const existingSession = await prisma.session.findFirst({
    where: { userId: user.id, userAgent, ipAddress },
  });

  if (existingSession) await tokenUtil.deleteSession(existingSession.id);

  const accessToken = tokenUtil.generateAccessToken({ id: user.id, role: user.role });
  const refreshToken = tokenUtil.generateRefreshToken();

  await tokenUtil.saveRefreshTokenToDatabase(user.id, refreshToken, userAgent, ipAddress);

  return { accessToken, refreshToken };
};

const refreshAccessToken = async (refreshToken, userAgent, ipAddress) => {
  if (!refreshToken) {
    throw new CustomError("Token de atualização não fornecido", 401);
  }

  const session = await tokenUtil.findSessionByRefreshToken(refreshToken);

  if (!session || session.expiresAt < new Date()) {
    if (session) await tokenUtil.deleteSession(session.id);
    return null;
  }

  const payload = { id: session.user.id, role: session.user.role };
  const newAccessToken = tokenUtil.generateAccessToken(payload);
  const newRefreshToken = tokenUtil.generateRefreshToken();

  if (!newAccessToken || !newRefreshToken) {
    console.error("Erro ao gerar novos accessToken ou refreshToken");
    return null;
  }

  const updatedSession = await tokenUtil.saveRefreshTokenToDatabase(
    session.user.id,
    newRefreshToken,
    userAgent,
    ipAddress
  );

  if (!updatedSession) {
    console.error("Erro ao atualizar refreshToken no banco de dados");
    return null;
  }

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

const logout = async (refreshToken) => {
  if (!refreshToken) throw new CustomError("Token de logout não fornecido", 401);

  const session = await tokenUtil.findSessionByRefreshToken(refreshToken);
  console.log(session);
  if (session) {
    await tokenUtil.deleteSession(session.id);
    return true;
  }
  return false;
};

module.exports = { signUp, signIn, logout, refreshAccessToken };
