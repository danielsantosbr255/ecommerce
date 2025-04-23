const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");

const createPromotion = async (data) => {
  const { title, description, discount, isActive, startsAt, endsAt, products } = data;

  return await prisma.promotion.create({
    data: {
      title,
      description,
      discount,
      isActive,
      startsAt: new Date(startsAt),
      endsAt: new Date(endsAt),
      products: { connect: products.map((id) => ({ id })) },
    },
  });
};

const getPromotions = async () => {
  return await prisma.promotion.findMany({
    where: { isActive: true },
    include: { products: { include: { images: true } } },
  });
};

const getPromotionById = async (id) => {
  return await prisma.promotion.findUnique({
    where: { id },
    include: { products: { include: { images: true } } },
  });
};

module.exports = { createPromotion, getPromotions, getPromotionById };
