const uuid = require("uuid").v4;
const slugify = require("slugify");
const { prisma } = require("../src/common/database/prisma");

const variants = [
  {
    name: "64GB - Preto",
    sku: uuid(),
    price: 3000,
    stock: 20,
    attributes: {
      size: "64GB",
      color: "Preto",
    },
  },
  {
    name: "128GB - Azul",
    sku: uuid(),
    price: 3500,
    stock: 30,
    attributes: {
      size: "128GB",
      color: "Azul",
    },
  },
];

const createProduct = async (title, price, brand, category, promotion, images) => {
  const product = {
    title: title,
    description: "lorem ipsulum dolor sit amet, consectetur adipiscing elit",
    price: price,
    stock: 50,
    slug: slugify(title, { lower: true }),
    brandId: brand.id,
    categoryId: category.id,
    images: { create: images },
    promotions: promotion && { connect: [{ id: promotion.id }] },
    specifications: {
      create: [
        { name: "Cor", value: "Preto" },
        { name: "Tamanho da Tela", value: '6.5"' },
      ],
    },
    // variants: { create: variants },
  };

  return prisma.product.create({ data: product });
};

module.exports = createProduct;
