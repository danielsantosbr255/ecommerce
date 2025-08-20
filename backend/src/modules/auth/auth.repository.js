const { accessibleBy } = require("@casl/prisma");
const { prisma } = require("../../common/database/prisma");

class AuthRepository {
  constructor() {
    this.prisma = prisma;
  }

  createSession({ userId, accessToken, refreshToken, ipAddress, userAgent, os, browser, device, location, expiresAt }) {
    return this.prisma.session.upsert({
      where: { userId_userAgent: { userId, userAgent } },
      update: { accessToken, refreshToken, ipAddress, userAgent, os, browser, device, location, expiresAt },
      create: { userId, accessToken, refreshToken, ipAddress, userAgent, os, browser, device, location, expiresAt },
      include: { user: true, user: { omit: { password: true } } },
    });
  }

  getSessionByUserId({ userId, userAgent }) {
    return this.prisma.session.findUnique({
      where: { userId_userAgent: { userId, userAgent } },
    });
  }

  getSessions(req) {
    return this.prisma.session.findMany({ where: accessibleBy(req.ability, "read").Session });
  }

  getSessionById(req, id) {
    return this.prisma.session.findUnique({
      where: { id, AND: accessibleBy(req.ability, "read").Session },
    });
  }

  updateSession(id, data) {
    return this.prisma.session.update({ where: { id }, data });
  }

  deleteSessionByAgent({ userId, userAgent }) {
    return this.prisma.session.delete({ where: { userId_userAgent: { userId, userAgent } } });
  }

  deleteSession(id) {
    return this.prisma.session.delete({ where: { id } });
  }

  createUser(data) {
    return this.prisma.user.create({ data });
  }

  findByEmail(email) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}

module.exports = new AuthRepository();
