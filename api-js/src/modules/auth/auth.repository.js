const { accessibleBy } = require("@casl/prisma");
const { prisma } = require("../../common/database/prisma");

const createSession = ({ userId, accessToken, refreshToken, userAgent, ipAddress, expiresAt }) => {
  return prisma.session.upsert({
    where: { userId_userAgent: { userId, userAgent } },
    update: { accessToken, refreshToken },
    create: { userId, accessToken, refreshToken, userAgent, ipAddress, expiresAt },
    include: { user: true, user: { omit: { password: true } } },
  });
};

const getSessionByUserId = ({ userId, userAgent }) => {
  return prisma.session.findFirst({ where: { userId, userAgent } });
};

const getSessions = (req) => {
  return prisma.session.findMany({ where: accessibleBy(req.ability, "read").Session });
};

const getSessionById = (req, id) => {
  return prisma.session.findUnique({
    where: { id, AND: accessibleBy(req.ability, "read").Session },
  });
};

const deleteSessionByAgent = ({ userId, userAgent }) => {
  return prisma.session.delete({ where: { userId_userAgent: { userId, userAgent } } });
};

const deleteSession = (req, id) => {
  return prisma.session.delete({
    where: { id, AND: accessibleBy(req.ability, "delete").Session },
  });
};

const createUser = (data) => {
  return prisma.user.create({ data });
};

const findByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

module.exports = {
  createSession,
  getSessionByUserId,
  deleteSession,
  deleteSessionByAgent,
  createUser,
  findByEmail,
  getSessions,
  getSessionById,
};
