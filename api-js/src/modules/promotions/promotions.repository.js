const { prisma } = require("../../common/database/prisma");

class PromotionRepository {
  constructor() {
    this.prisma = prisma;
  }

  create(data) {
    return this.prisma.promotion.create({ data });
  }

  getAll() {
    return this.prisma.promotion.findMany({
      where: { isActive: true },
      include: { products: { include: { product: { include: { images: true } } } } },
    });
  }

  getBySlug(slug) {
    return this.prisma.promotion.findUnique({
      where: { slug },
      include: { products: { include: { product: { include: { images: true } } } } },
    });
  }

  getById(id) {
    return this.prisma.promotion.findUnique({
      where: { id },
      include: { products: { include: { product: { include: { images: true } } } } },
    });
  }

  update(id, data) {
    return this.prisma.promotion.update({ where: { id }, data });
  }

  remove(id) {
    return this.prisma.promotion.delete({ where: { id } });
  }
}

module.exports = new PromotionRepository();
