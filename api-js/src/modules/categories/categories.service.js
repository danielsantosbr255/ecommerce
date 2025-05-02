const slugify = require("slugify");
const { prisma } = require("../../common/database/prisma");

const createCategory = async (data) => {
  const { name, image } = data;
  return await prisma.category.create({ data: { name, slug: slugify(name), image } });
};

const getCategories = async () => {
  return await prisma.category.findMany({
    include: { products: true },
  });
};

const getCategoryBySlug = async (slug) => {
  return await prisma.category.findUnique({
    where: { slug },
    include: { products: true },
  });
};

module.exports = { createCategory, getCategories, getCategoryBySlug };
