const { prisma } = require("../../common/database/prisma");

class PermissionRepository {
  constructor() {
    this.prisma = prisma;
  }

  create(data) {
    return this.prisma.permission.create({ data });
  }

  getAll() {
    return this.prisma.permission.findMany();
  }

  getOne(id) {
    return this.prisma.permission.findUnique({ where: { id } });
  }

  getByActionAndSubject(action, subject) {
    return this.prisma.permission.findUnique({ where: { action, subject } });
  }

  update(id, data) {
    return this.prisma.permission.update({ where: { id }, data });
  }

  remove(id) {
    return this.prisma.permission.delete({ where: { id } });
  }
}

module.exports = new PermissionRepository();
