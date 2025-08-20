const { accessibleBy } = require("@casl/prisma");
const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");
const repository = require("./orders.repository");

class OrderService {
  constructor() {
    this.repository = repository;
  }

  create = async (userId) => {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    const cartItems = cart.items;

    if (!cartItems || cartItems.length === 0) {
      throw new CustomError("O carrinho está vazio", 400);
    }

    const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const order = await repository.create({ userId, cartItems, totalPrice });

    for (const item of cartItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    await prisma.cart.update({
      where: { userId },
      data: { items: { deleteMany: {} } },
    });

    return order;
  };

  getAll = (ability) => {
    return repository.getAll(ability);
  };

  getOne = (id, ability) => {
    return repository.getOne(id, ability);
  };

  getByUserId = (userId, ability) => {
    return repository.getByUserId(userId, ability);
  };

  update = (id, data, ability) => {
    return repository.update(id, data, ability);
  };

  delete = (id, ability) => {
    return repository.delete(id, ability);
  };
}

module.exports = new OrderService();
