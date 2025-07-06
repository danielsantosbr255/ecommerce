const slugify = require("slugify");
const { prisma } = require("../../common/database/prisma");

const create = async (data) => {
  const { name, image } = data;
  return await prisma.brand.create({ data: { name, slug: slugify(name), image } });
};

const getAll = async () => {
  return await prisma.brand.findMany({
    include: { products: { include: { images: true } } },
  });
};

const getBySlug = async (slug) => {
  return await prisma.brand.findUnique({
    where: { slug },
    include: { products: { include: { images: true } } },
  });
};

module.exports = { create, getAll, getBySlug };
