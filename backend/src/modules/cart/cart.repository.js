const { prisma } = require("../../common/database/prisma");
const { getPagination, buildMeta } = require("../../common/utils/pagination.util");

class CartRepository {
  constructor() {
    this.prisma = prisma;
  }

  create(userId, { productId, quantity }) {
    return this.prisma.cart.create({
      data: {
        userId,
        items: { create: { productId, quantity } },
      },
    });
  }

  async getMany(query) {
    const { page, limit, skip } = getPagination(query);

    const [data, total] = await Promise.all([this.prisma.cart.findMany({ skip, take: limit }), this.prisma.cart.count()]);

    return {
      data,
      meta: buildMeta(total, page, limit),
    };
  }

  getOne(id) {
    return this.prisma.cart.findUnique({
      where: { id },
      include: {
        items: { include: { product: { include: { images: { take: 1 } } } } },
      },
    });
  }

  getByUserId(userId) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: { include: { images: { take: 1 } } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });
  }

  async update(id, { productId, quantity }) {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
      include: { items: true },
    });

    const cartItem = cart.items.find((item) => item.productId === productId);

    if (cartItem) {
      await this.prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: { cartId: id, productId, quantity },
      });
    }

    return this.getOne(id);
  }

  delete(id) {
    return this.prisma.cart.delete({ where: { id } });
  }
}

module.exports = new CartRepository();
