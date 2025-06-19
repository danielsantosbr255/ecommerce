const { accessibleBy } = require("@casl/prisma");
const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");

const createOrder = async (userId) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  });

  console.log("Cart:", cart);

  const cartItems = cart.items;

  if (!cartItems || cartItems.length === 0) {
    throw new CustomError("O carrinho está vazio", 400);
  }

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Criar o pedido
  const order = await prisma.order.create({
    data: {
      userId: userId,
      totalPrice: total,
      items: {
        create: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
    },
  });

  // Atualizar o estoque
  for (const item of cartItems) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } },
    });
  }

  // Apagar o carrinho após a compra
  await prisma.cart.update({
    where: { userId },
    data: { items: { deleteMany: {} } },
  });

  return order;
};

const getOrdersByUserId = async (req) => {
  const orders = await prisma.order.findUnique({
    where: {
      id: req.params.id,
      AND: [accessibleBy(req.ability, "read").Order],
    },
    include: { user: true, items: { include: { product: true } } },
  });
  return orders;
};

const findAllOrders = async (req) => {
  const orders = await prisma.order.findMany({
    where: {
      AND: [accessibleBy(req.ability, "read").Order],
    },
    include: { user: true },
  });
  return orders;
};

module.exports = { createOrder, getOrdersByUserId, findAllOrders };
