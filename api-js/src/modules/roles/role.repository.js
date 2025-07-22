const { prisma } = require("../../common/database/prisma");

class RoleRepository {
  constructor() {
    this.prisma = prisma;
  }

  async create(data) {
    return await this.prisma.role.create({ data });
  }

  async getAll() {
    return await this.prisma.role.findMany();
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

  async addPermissions(id, permissionIds) {
    return this.prisma.role.update({
      where: { id },
      data: { permissions: { set: permissionIds.map((permId) => ({ id: permId })) } },
      include: { permissions: true },
    });
  }

  async addUser(id, userIds) {
    return this.prisma.role.update({
      where: { id },
      data: { users: { set: userIds.map((userId) => ({ userId })) } },
      include: { users: { include: { user: true } } },
    });
  }
}

module.exports = new RoleRepository();
