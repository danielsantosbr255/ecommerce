const { prisma } = require("../../common/database/prisma");
const { encryptData } = require("../../common/utils/crypto.util");
const CustomError = require("../../common/utils/CustomError");
const { decodeJWT } = require("../../common/utils/token.util");

const createSession = ({ userId, accessToken, refreshToken, userAgent, ipAddress }) => {
  const expiresAt = new Date(decodeJWT(refreshToken).exp * 1000); // Convert seconds to milliseconds
  const encrypted = encryptData(refreshToken);

  try {
    return prisma.session.upsert({
      where: { userId_userAgent_ipAddress: { userId, userAgent, ipAddress } },
      update: { accessToken, refreshToken: encrypted },
      create: { userId, refreshToken: encrypted, accessToken, userAgent, ipAddress, expiresAt },
    });
  } catch (error) {
    throw new CustomError("Erro ao criar sessão", 500);
  }
};

const findSession = ({ userId, refreshToken, userAgent, ipAddress }) => {
  return prisma.session.findFirst({
    where: { userId, refreshToken, userAgent, ipAddress },
  });
};

const getSessions = (userId) => {
  return prisma.session.findMany({ where: { userId } });
};

const deleteSessions = (userId) => {
  return prisma.session.deleteMany({ where: { userId } });
};

const deleteSession = (sessionId) => {
  try {
    return prisma.session.delete({ where: { id: sessionId } });
  } catch (error) {
    if (error.code === "P2025") {
      throw new CustomError("Sessão não encontrada", 404);
    }
    throw new CustomError("Erro ao deletar sessão", 500);
  }
};

const createUser = (data) => {
  return prisma.user.create({ data });
};

const findByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

module.exports = { createSession, findSession, deleteSession, createUser, findByEmail, getSessions, deleteSessions };
