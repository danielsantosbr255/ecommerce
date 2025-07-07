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

  async getById(id) {
    return await this.prisma.role.findUnique({ where: { id } });
  }

  async getByName(name) {
    return await this.prisma.role.findUnique({ where: { name } });
  }

  async update(id, data) {
    return await this.prisma.role.update({ where: { id }, data });
  }

  async remove(id) {
    return await this.prisma.role.delete({ where: { id } });
  }
}

module.exports = new RoleRepository();
