const { accessibleBy } = require("@casl/prisma");
const { prisma } = require("../../common/database/prisma");

class AddressRepository {
  constructor() {
    this.prisma = prisma;
  }

  create(data) {
    return this.prisma.address.create({ data, include: { user: { omit: { password: true } } } });
  }

  getAll(ability) {
    return this.prisma.address.findMany({
      where: accessibleBy(ability).Address,
      include: { user: { omit: { password: true } } },
    });
  }

  getByUserDefault(userId) {
    return this.prisma.address.findFirst({
      where: { userId, isDefault: true },
      include: { user: { omit: { password: true } } },
    });
  }

  getOne(ability, id) {
    return this.prisma.address.findUnique({
      where: { id, AND: accessibleBy(ability, "read").Address },
      include: { user: { omit: { password: true } } },
    });
  }

  update(ability, id, data) {
    return this.prisma.address.update({
      where: { id, AND: accessibleBy(ability, "update").Address },
      data,
      include: { user: { omit: { password: true } } },
    });
  }

  remove(ability, id) {
    return this.prisma.address.delete({
      where: { id, AND: accessibleBy(ability, "delete").Address },
    });
  }
}

module.exports = new AddressRepository();
