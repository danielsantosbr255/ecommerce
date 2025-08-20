const { prisma } = require("../../common/database/prisma");

class BrandRepository {
  constructor() {
    this.prisma = prisma;
  }

  async addItem(data) {
    const { userId, productId, quantity } = data;

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: { stock: true },
    });

    if (!product) throw new CustomError("Produto não encontrado.", 404);
    if (product.stock < quantity) throw new CustomError("Quantidade em estoque insuficiente.", 400);

    let cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) cart = await this.prisma.cart.create({ data: { userId } });

    const cartItem = await this.prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      update: { quantity: { increment: quantity } },
      create: { cartId: cart.id, productId, quantity },
    });
    return cartItem;
  }

  async getOwnCart(userId) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: { include: { images: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!cart) {
      await this.prisma.cart.create({ data: { userId } });
      return [];
    }

    return cart.items;
  }

  async getCart(id) {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    });

    if (!cart) {
      await this.prisma.cart.create({ data: { id } });
      return [];
    }

    return cart.items;
  }

  updateItem(data) {
    const { id, quantity } = data;

    return this.prisma.cartItem.update({
      where: { id },
      data: { quantity },
    });
  }

  removeCart(data) {
    const { userId } = data;
    return this.prisma.cart.delete({ where: { userId } });
  }

  removeItem(data) {
    const { id } = data;
    return this.prisma.cartItem.delete({ where: { id } });
  }
}

module.exports = new BrandRepository();
