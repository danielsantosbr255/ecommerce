const { accessibleBy } = require("@casl/prisma");
const { prisma } = require("../../common/database/prisma");

class OrderRepository {
  constructor() {
    this.prisma = prisma;
  }

  create({ userId, cartItems, totalPrice }) {
    return this.prisma.order.create({
      data: {
        userId,
        totalPrice,
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    });
  }

  getAll(ability) {
    return this.prisma.order.findMany({
      where: accessibleBy(ability).Order,
      include: { user: true },
    });
  }

  getOne(id, ability) {
    return this.prisma.order.findUnique({
      where: { id, AND: [accessibleBy(ability, "read").Order] },
      include: { user: true, items: { include: { product: true } } },
    });
  }

  getByUserId(userId, ability) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        user: { select: { id: true, name: true } },
        items: {
          include: {
            product: {
              select: { id: true, title: true, images: { take: 1, select: { url: true } } },
            },
          },
        },
      },
    });
  }

  update(id, data, ability) {
    return this.prisma.order.update({
      where: { id, AND: [accessibleBy(ability, "update").Order] },
      data,
      include: { user: true, items: { include: { product: true } } },
    });
  }

  delete(id, ability) {
    return this.prisma.order.delete({
      where: { id, AND: [accessibleBy(ability, "delete").Order] },
    });
  }
}

module.exports = new OrderRepository();
