const { prisma } = require("../../common/database/prisma");

const create = async ({ data, uploadResults }) => {
  return await prisma.product.create({
    data: {
      ...data,
      images: {
        create: uploadResults.map((result) => ({
          url: result.secure_url,
          alt: data.title,
        })),
      },
      specifications: {
        create: data.specifications,
      },
    },
    include: { images: true, specifications: true, category: true, brand: true, reviews: true },
  });
};

const getAll = async () => {
  return await prisma.product.findMany({
    include: { images: true, specifications: true, category: true, reviews: true },
  });
};

const getById = async (id) => {
  return await prisma.product.findUnique({
    where: { id },
    include: { images: true, specifications: true, category: true, brand: true, reviews: true },
  });
};

const getBySlug = async (slug) => {
  return await prisma.product.findUnique({
    where: { slug },
    include: { images: true, specifications: true, category: true, brand: true, reviews: true },
  });
};

const getByBrand = (brand) => {
  return prisma.product.findMany({
    where: { brand: { name: brand } },
    include: { images: true, specifications: true, category: true, brand: true },
  });
};

const getByCategory = async (categoryId, productId) => {
  return await prisma.product.findMany({
    where: { categoryId, NOT: { id: productId } },
    include: { images: true, specifications: true, category: true, brand: true },
  });
};

const getByQuery = (query) => {
  return prisma.product.findMany({
    take: 10,
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        // { category: { contains: query, mode: "insensitive" } },
      ],
    },
    include: { images: true, specifications: true, category: true },
  });
};

const update = async (id, data) => {
  return await prisma.product.update({ where: { id }, data });
};

const remove = async (id) => {
  return await prisma.product.delete({ where: { id } });
};

module.exports = { create, getAll, getById, getBySlug, getByCategory, getByBrand, getByQuery, update, remove };
