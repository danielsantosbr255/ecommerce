const { prisma } = require("../../common/database/prisma");

class CategoryRepository {
  constructor() {
    this.prisma = prisma;
  }

  async create(data) {
    return await this.prisma.category.create({ data });
  }

  async getById(id) {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async getBySlug(slug) {
    return await this.prisma.category.findUnique({
      where: { slug },
      include: { products: { include: { images: { take: 1 } } } },
    });
  }

  async getAll() {
    return await this.prisma.category.findMany({
      include: { products: { include: { images: true } } },
    });
  }

  async update(slug, data) {
    return await this.prisma.category.update({ where: { slug }, data });
  }

  async remove(slug) {
    return await this.prisma.category.delete({ where: { slug } });
  }
}

module.exports = new CategoryRepository();
