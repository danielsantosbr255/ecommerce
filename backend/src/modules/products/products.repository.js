const { prisma } = require("../../common/database/prisma");

class ProductRepository {
  constructor() {
    this.prisma = prisma;
  }

  async create(data) {
    const { keptImages, ...restData } = data;

    return await this.prisma.product.create({
      data: {
        ...restData,
        images: {
          create: data.images.map((image) => ({
            url: image.url,
            alt: image.alt,
            order: image.order,
            publicId: image.publicId,
          })),
        },
        specifications: {
          create: data.specifications,
        },
      },
      include: { images: true, specifications: true, category: true, brand: true, reviews: true },
    });
  }

  async getMany({ where, skip, take, orderBy }) {
    return await this.prisma.product.findMany({
      where,
      take,
      skip,
      include: {
        brand: { select: { id: true, name: true } },
        category: { select: { id: true, name: true } },
        images: {
          select: { id: true, url: true, alt: true },
          take: 1,
          orderBy: { order: "asc" },
        },
      },
      orderBy,
    });
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
      include: {
        images: true,
        specifications: true,
        category: true,
        brand: true,
      },
    });
  }

  async getRelated({ id, categoryId, brandId }) {
    return this.prisma.product.findMany({
      where: {
        isActive: true,
        id: { not: id },
        OR: [{ categoryId }, { brandId }],
      },
      take: 10,
      include: {
        images: {
          select: { id: true, url: true, alt: true },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getCount(where) {
    const defaultWhere = { isActive: true, ...where };
    return this.prisma.product.count({ where: defaultWhere });
  }

  async update(id, data) {
    const { keptImages, brandId, categoryId, ...updateData } = data;

    return await this.prisma.product.update({
      where: { id },
      data: {
        ...updateData,
        images: {
          create: data.images,
          updateMany: keptImages.map((img) => ({
            where: { id: img.id },
            data: {
              order: img.order,
              alt: img.alt,
            },
          })),
        },
        brand: {
          connect: { id: data.brandId },
        },
        category: {
          connect: { id: data.categoryId },
        },
        specifications: {
          deleteMany: {},
          create: data.specifications || [],
        },
      },
      include: { images: true, specifications: true, category: true, brand: true, reviews: true },
    });
  }

  async remove(id) {
    return await this.prisma.product.delete({ where: { id } });
  }
}

module.exports = new ProductRepository();
