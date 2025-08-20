const { prisma } = require("../../common/database/prisma");

class CategoryRepository {
  constructor() {
    this.prisma = prisma;
  }

  create(data) {
    return this.prisma.category.create({ data });
  }

  getAll() {
    return this.prisma.category.findMany({ orderBy: { name: "asc" } });
  }

  getById(id) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  getBySlug(slug) {
    return this.prisma.category.findUnique({
      where: { slug },
      include: { products: { include: { images: { take: 1 } } } },
    });
  }

  update(slug, data) {
    return this.prisma.category.update({ where: { slug }, data });
  }

  remove(slug) {
    return this.prisma.category.delete({ where: { slug } });
  }
}

module.exports = new CategoryRepository();
