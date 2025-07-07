const { prisma } = require("../../common/database/prisma");

class ProductRepository {
  constructor() {
    this.prisma = prisma;
  }

  async create({ data, uploadResults }) {
    return await this.prisma.product.create({
      data: {
        ...data,
        images: {
          create: uploadResults.map((result) => ({
            url: result.secure_url,
            alt: data.title,
          })),
        },
        specifications: {
          create: data.specifications,
        },
      },
      include: { images: true, specifications: true, category: true, brand: true, reviews: true },
    });
  }

  async getAll(where, take, skip, orderBy) {
    const products = await this.prisma.product.findMany({
      where,
      take,
      skip,
      include: {
        brand: { select: { id: true, name: true } },
        category: { select: { id: true, name: true } },
        images: {
          select: { id: true, url: true, alt: true },
          take: 1,
        },
      },
      orderBy,
    });

    const totalProducts = await this.prisma.product.count({ where });

    return { products, totalProducts };
  }

  async getById(id) {
    return await this.prisma.product.findUnique({
      where: { id },
      include: { images: true, specifications: true, category: true, brand: true, reviews: true },
    });
  }

  async getBySlug(slug) {
    return await this.prisma.product.findUnique({
      where: { slug },
      include: { images: true, specifications: true, category: true, brand: true, reviews: true },
    });
  }

  async getRelated(productId, categoryId, brandId) {
    return await this.prisma.product.findMany({
      where: { isActive: true, OR: [{ categoryId }, { brandId }], NOT: { id: productId } },
      take: 10,
      include: {
        brand: { select: { id: true, name: true } },
        category: { select: { id: true, name: true } },
        images: {
          select: { id: true, url: true, alt: true },
          take: 1,
        },
      },
    });
  }

  async getCount(where) {
    const defaultWhere = { isActive: true, ...where };
    return this.prisma.product.count({ where: defaultWhere });
  }

  async update(id, data) {
    return await this.prisma.product.update({ where: { id }, data });
  }

  async remove(id) {
    return await this.prisma.product.delete({ where: { id } });
  }
}

module.exports = new ProductRepository();
