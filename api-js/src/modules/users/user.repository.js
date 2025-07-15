const { accessibleBy } = require("@casl/prisma");
const { prisma } = require("../../common/database/prisma");

class UserRepository {
  constructor() {
    this.prisma = prisma;
  }

  getAll(ability) {
    return this.prisma.user.findMany({
      where: accessibleBy(ability, "read").User,
      omit: { password: true },
      include: { roles: { include: { role: { include: { permissions: { include: { permission: true } } } } } } },
    });
  }

  getById(ability, id) {
    return this.prisma.user.findUnique({
      where: { id, AND: accessibleBy(ability, "read").User },
      omit: { password: true },
      include: { roles: { include: { role: { include: { permissions: { include: { permission: true } } } } } } },
    });
  }

  getByEmail(ability, email) {
    return this.prisma.user.findUnique({
      where: { email, AND: accessibleBy(ability, "read").User },
      omit: { password: true },
    });
  }

  update(ability, id, data) {
    return this.prisma.user.update({
      where: { id, AND: accessibleBy(ability, "update").User },
      data: {
        name: data.name || user.name,
        email: data.email || user.email,
        password: data.password ? authUtil.hashPassword(data.password, 10) : user.password,
        role: role || user.role,
      },
    });
  }

  remove(ability, id) {
    return this.prisma.user.delete({
      where: { id, AND: accessibleBy(ability, "delete").User },
      omit: { password: true },
    });
  }
}

module.exports = new UserRepository();
