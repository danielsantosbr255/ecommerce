const { accessibleBy } = require("@casl/prisma");
const { prisma } = require("../../common/database/prisma");

class ReviewRepository {
  constructor() {
    this.prisma = prisma;
  }

  create(data) {
    return this.prisma.review.create({ data });
  }

  getAll() {
    return this.prisma.review.findMany({
      include: { user: { select: { id: true, name: true } }, product: true },
    });
  }

  getById(id) {
    return this.prisma.review.findUnique({ where: { id } });
  }

  update(id, data) {
    return this.prisma.review.update({
      where: { id, AND: accessibleBy(ability, "update").Review },
      data,
    });
  }

  delete(id) {
    return this.prisma.review.delete({
      where: { id, AND: accessibleBy(ability, "delete").Review },
    });
  }
}

module.exports = new ReviewRepository();
