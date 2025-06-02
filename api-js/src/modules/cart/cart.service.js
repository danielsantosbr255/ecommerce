const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");

const addItem = async (data) => {
  const { userId, productId, quantity } = data;

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { stock: true },
  });

  if (!product) throw new CustomError("Produto não encontrado.", 404);
  if (product.stock < quantity) throw new CustomError("Quantidade em estoque insuficiente.", 400);

  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) cart = await prisma.cart.create({ data: { userId } });

  const cartItem = await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId } },
    update: { quantity: { increment: quantity } },
    create: { cartId: cart.id, productId, quantity },
  });
  return cartItem;
};

const getOwnCart = async (userId) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: { include: { images: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!cart) {
    await prisma.cart.create({ data: { userId } });
    return [];
  }

  return cart.items;
};

const getCart = async (id) => {
  const cart = await prisma.cart.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  });

  if (!cart) {
    await prisma.cart.create({ data: { id } });
    return [];
  }

  return cart.items;
};

const updateItem = (data) => {
  const { id, quantity } = data;

  return prisma.cartItem.update({
    where: { id },
    data: { quantity },
  });
};

const removeCart = (data) => {
  const { userId } = data;
  return prisma.cart.delete({ where: { userId } });
};

const removeItem = (data) => {
  const { id } = data;
  return prisma.cartItem.delete({ where: { id } });
};

module.exports = { addItem, updateItem, getOwnCart, getCart, removeItem, removeCart };
