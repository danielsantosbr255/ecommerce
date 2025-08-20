const { prisma } = require("../../common/database/prisma");
const { getPagination, buildMeta } = require("../../common/utils/pagination.util");

class BrandRepository {
  constructor() {
    this.prisma = prisma;
  }

  create(data) {
    return this.prisma.brand.create({ data });
  }

  async getMany(query) {
    const { page, limit, skip } = getPagination(query);

    const where = {};
    if (query.search) where.name = { contains: query.search, mode: "insensitive" };

    const [brands, total] = await Promise.all([
      this.prisma.brand.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: "asc" },
      }),
      this.prisma.brand.count({ where }),
    ]);

    return {
      data: brands,
      meta: buildMeta(total, page, limit),
    };
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
