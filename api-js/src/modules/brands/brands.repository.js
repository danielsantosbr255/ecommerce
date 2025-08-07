const { prisma } = require("../../common/database/prisma");

class BrandRepository {
  constructor() {
    this.prisma = prisma;
  }

  create(data) {
    return this.prisma.brand.create({ data });
  }

  getAll() {
    return this.prisma.brand.findMany({ orderBy: { name: "asc" } });
  }

  getBySlug(slug) {
    return this.prisma.brand.findUnique({
      where: { slug },
      include: { products: { include: { images: true } } },
    });
  }

  getById(id) {
    return this.prisma.brand.findUnique({
      where: { id },
      include: { products: { include: { images: true } } },
    });
  }

  update(slug, data) {
    return this.prisma.brand.update({ where: { slug }, data });
  }

  remove(slug) {
    return this.prisma.brand.delete({ where: { slug } });
  }
}

module.exports = new BrandRepository();
