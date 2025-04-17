const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");

const addItem = async (userId, productId, quantity) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { stock: true },
  });

  if (!product) throw new CustomError("Produto não encontrado.", 404);
  if (product.stock < quantity) throw new CustomError("Quantidade em estoque insuficiente.", 400);

  const cart = await prisma.cartItem.upsert({
    where: { userId, productId },
    update: { quantity: { increment: quantity } },
    create: { userId, productId, quantity },
  });
  return cart;
};

const removeItem = (id) => {
  return prisma.cartItem.deleteMany({
    where: { id },
  });
};

const updateItem = (id, quantity) => {
  return prisma.cartItem.update({
    where: { id },
    data: { quantity },
  });
};

const getCart = async (userId) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  });

  if (!cart) {
    await prisma.cart.create({ data: { userId } });
    return []; // carrinho vazio, sem items
  }

  return cart.items;
};

module.exports = { addItem, removeItem, updateItem, getCart };
