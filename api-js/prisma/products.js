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

const randomDescriptions = [
  "Um produto essencial para o seu dia a dia.",
  "A solução perfeita para seus problemas.",
  "Descubra uma nova maneira de fazer as coisas.",
  "Inovação e praticidade em um só lugar.",
  "Experimente a diferença agora mesmo.",
  "Simplifique sua vida com este produto incrível.",
  "Resultados garantidos e satisfação total.",
  "A melhor escolha para você e sua família.",
  "Não deixe essa oportunidade passar!",
  "Comece a transformar hoje mesmo.",
];

function randomDescription() {
  const indice = Math.floor(Math.random() * randomDescriptions.length);
  return randomDescriptions[indice];
}

const createProduct = async (title, price, brand, category, promotion, images) => {
  const product = {
    title: title,
    description: randomDescription(),
    price: price,
    stock: 50,
    slug: slugify(title, { lower: true }),
    brandId: brand.id,
    categoryId: category.id,
    images: { create: images },
    promotions: promotion && { connect: [{ id: promotion.id }] },
    specifications: {
      create: [
        { name: "Cor", value: "Desconhecido" },
        { name: "Tamanho", value: '6.5"' },
        { name: "Garantia", value: "1 ano" },
        { name: "Peso", value: "200g" },
        { name: "Material", value: "Generico" },
      ],
    },
    // variants: { create: variants },
  };

  return prisma.product.create({ data: product });
};

module.exports = createProduct;
