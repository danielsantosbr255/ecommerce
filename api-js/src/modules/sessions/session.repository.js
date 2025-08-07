const { accessibleBy } = require("@casl/prisma");
const { prisma } = require("../../common/database/prisma");

class SessionRepository {
  constructor() {
    this.prisma = prisma;
  }

  getAll(ability) {
    return this.prisma.session.findMany({ where: accessibleBy(ability, "read").Session, orderBy: { createdAt: "desc" } });
  }

  getById(id, ability) {
    return this.prisma.session.findUnique({
      where: { id, AND: accessibleBy(ability, "read").Session },
    });
  }

  update(id, data, ability) {
    return this.prisma.session.update({
      where: { id, AND: accessibleBy(ability, "update").Session },
      data,
    });
  }

  deleteByAgent({ userId, userAgent }) {
    return this.prisma.session.delete({ where: { userId_userAgent: { userId, userAgent } } });
  }

  remove(id, ability) {
    return this.prisma.session.delete({
      where: { id, AND: accessibleBy(ability, "delete").Session },
    });
  }
}

module.exports = new SessionRepository();
