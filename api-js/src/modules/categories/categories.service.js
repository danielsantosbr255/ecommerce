const slugify = require("slugify");
const { prisma } = require("../../common/database/prisma");

const create = async (data) => {
  const { name, image } = data;
  return await prisma.category.create({ data: { name, slug: slugify(name), image } });
};

const getAll = async () => {
  return await prisma.category.findMany({
    include: { products: { include: { images: true } } },
  });
};

const getBySlug = async (slug) => {
  return await prisma.category.findUnique({
    where: { slug },
    include: { products: { include: { images: true } } },
  });
};

module.exports = { create, getAll, getBySlug };
