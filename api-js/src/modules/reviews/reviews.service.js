const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/review.validator");

const bodyData = (data) => {
  const { productSlug, rating, comment, userId } = data;

  return {
    ...(productSlug !== undefined && { productSlug }),
    ...(rating !== undefined && { rating }),
    ...(comment !== undefined && { comment }),
    ...(userId !== undefined && { userId }),
  };
};

const createReview = async (productSlug, rating, comment, userId) => {
  validator.create(bodyData({ productSlug, rating, comment, userId }));

  const product = await prisma.product.findUnique({ where: { slug: productSlug } });
  if (!product) throw new CustomError("Produto não encontrado!", 404);

  return prisma.review.create({ data: { productId: product.id, rating, comment, userId } });
};

const getReviewById = async (id) => {
  return await prisma.review.findUnique({ where: { id } });
};

const getReviews = async (slug) => {
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) throw new CustomError("Produto não encontrado!", 404);

  return await prisma.review.findMany({
    where: { productId: product.id },
    include: { user: true, product: true },
  });
};

const updateReview = async (id, rating, comment) => {
  const existingReview = await prisma.review.findUnique({ where: { id } });
  if (!existingReview) throw new CustomError("Produto não encontrado!", 404);

  const validatedData = validator.update(bodyData({ rating, comment }));
  return prisma.review.update({ where: { id }, data: validatedData });
};

const deleteReview = async (id) => {
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) throw new CustomError("Produto não encontrado!", 404);
  return prisma.review.delete({ where: { id } });
};

module.exports = { createReview, getReviews, getReviewById, updateReview, deleteReview };
