const { prisma } = require("../../common/database/prisma");

class RoleRepository {
  constructor() {
    this.prisma = prisma;
  }

  async create(data) {
    return await this.prisma.role.create({ data });
  }

  async getAll() {
    return await this.prisma.role.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        permissions: { include: { permission: true } },
        users: { include: { user: true } },
      },
    });
  }

  async getOne(id) {
    return await this.prisma.role.findUnique({
      where: { id },
      include: {
        permissions: { include: { permission: true } },
        users: { include: { user: true } },
      },
    });
  }

  async update(id, data) {
    return await this.prisma.role.update({ where: { id }, data });
  }

  async remove(id) {
    return await this.prisma.role.delete({ where: { id } });
  }
}

module.exports = new RoleRepository();
