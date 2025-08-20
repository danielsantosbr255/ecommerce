const { prisma } = require("../../common/database/prisma");

class RoleRepository {
  constructor() {
    this.prisma = prisma;
  }

  async create(data) {
    return await this.prisma.userRole.create({ data });
  }

  async getAll() {
    return await this.prisma.userRole.findMany({
      include: { permissions: true, users: true },
    });
  }

  async getOne(userId_role_Id) {
    return await this.prisma.userRole.findUnique({
      where: { userId_role_Id },
      include: { permissions: true, users: true },
    });
  }

  async update(userId_role_Id, data) {
    return await this.prisma.userRole.update({
      where: { userId_role_Id },
      data,
    });
  }

  async remove(userId_role_Id) {
    return await this.prisma.userRole.delete({
      where: { userId_role_Id },
    });
  }
}

module.exports = new RoleRepository();
