const { accessibleBy } = require("@casl/prisma");
const { prisma } = require("../../common/database/prisma");

class UserRepository {
  constructor() {
    this.prisma = prisma;
  }

  getMany({ where, take, skip, orderBy }) {
    return this.prisma.user.findMany({
      where,
      take,
      skip,
      orderBy,
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

  count(where) {
    return this.prisma.user.count({ where });
  }

  update(ability, id, data) {
    return this.prisma.user.update({
      where: { id, AND: accessibleBy(ability, "update").User },
      data: {
        name: data.name || user.name,
        email: data.email || user.email,
        password: data.password || user.password,
        roles: data.role ? { connect: { name: data.role } } : undefined,
      },
    });
  }

  remove(ability, id) {
    return this.prisma.user.delete({
      where: { id, AND: accessibleBy(ability, "delete").User },
      omit: { password: true },
    });
  }

  // TEST: Get a specific resource related to the user
  getResource = async (id, { resource, skip, limit, sort, filter }) => {
    const include = {
      // roles: { include: { role: { include: { permissions: { include: { permission: true } } } } } },
    };

    if (resource) {
      include[resource] = {
        skip,
        take: limit,
        orderBy: sort ? { [sort]: "asc" } : undefined,
        where: filter ? JSON.parse(filter) : undefined,
      };
    }

    return this.prisma.user.findUnique({ where: { id }, include });
  };
}

module.exports = new UserRepository();
