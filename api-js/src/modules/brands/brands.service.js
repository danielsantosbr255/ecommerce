const slugify = require("slugify");
const { prisma } = require("../../common/database/prisma");

const createBrand = async (data) => {
  const { name, image } = data;
  return await prisma.brand.create({ data: { name, slug: slugify(name), image } });
};

const getBrands = async () => {
  return await prisma.brand.findMany({
    include: { products: true },
  });
};

const getBrandBySlug = async (slug) => {
  return await prisma.brand.findUnique({
    where: { slug },
    include: { products: true },
  });
};

module.exports = { createBrand, getBrands, getBrandBySlug };
