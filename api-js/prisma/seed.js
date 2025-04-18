// prisma/seed.ts
const uuid = require("uuid").v4;
const slugify = require("slugify");
const { prisma } = require("../src/common/database/prisma");
const authUtil = require("../src/common/utils/auth.util");
const createProduct = require("./products");

const samsung_I = [
  {
    url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1744338997/ecommerce-images/tgt6k3zmudscs75zmlgh.webp",
    alt: "Smartphone frontal",
  },
];
const motorola_I = [
  {
    url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1744339092/ecommerce-images/h7a5uhg5qxjirwsecmgc.webp",
    alt: "Smartphone traseira",
  },
];
const tennis_I = [
  {
    url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1744811236/NIKE_AIR_MAX_1_ifhe0o.jpg",
    alt: "Smartphone traseira",
  },
];
const notebook_I = [
  {
    url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1744810940/notebook_jalczo.jpg",
    alt: "Smartphone traseira",
  },
];
const shirt_I = [
  {
    url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1744811428/il_570xN.5879039044_jtka_sfnrwh.jpg",
    alt: "Smartphone traseira",
  },
];
const chair_I = [
  {
    url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1744810974/71rpGOUI-2L._AC_UF894_1000_QL80__jvfkcr.jpg",
    alt: "Smartphone traseira",
  },
];
const watch_I = [
  {
    url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1744811006/71pbEc1KO3L_liwd5j.jpg",
    alt: "Smartphone traseira",
  },
];
const earphones_I = [
  {
    url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1744811037/514n0rnHIgL._AC_UF1000_1000_QL80__fyguve.jpg",
    alt: "Smartphone traseira",
  },
];
const coffee_maker_I = [
  {
    url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1744811082/Coffee_Machine_ECM10_ConceptView_Electrolux_1000x1000_zzjf2l.png",
    alt: "Smartphone traseira",
  },
];
const desk_I = [
  {
    url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1744811115/kappesberg-escritorios-mesa-de-director-15m-carvalho-munique-2-1-1728911896.jpg_u3vzvz.webp",
    alt: "Smartphone traseira",
  },
];
const monitor_I = [
  {
    url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1744811052/81qCnbJrAPL_ozv4ya.jpg",
    alt: "Smartphone traseira",
  },
];

async function main() {
  await prisma.cart.deleteMany();
  await prisma.session.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productSpecification.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.promotion.deleteMany();

  const user = await prisma.user.create({
    data: {
      id: uuid(),
      name: "Admin",
      email: "admin@email.com",
      password: await authUtil.hashPassword("gGCxU34aueNKwK"),
      role: "ADMIN",
    },
  });

  const samsung = await prisma.brand.create({ data: { id: uuid(), name: "Samsung" } });
  const motorola = await prisma.brand.create({ data: { id: uuid(), name: "Motorola" } });
  const dell = await prisma.brand.create({ data: { id: uuid(), name: "Dell" } });
  const nike = await prisma.brand.create({ data: { id: uuid(), name: "Nike" } });
  const apple = await prisma.brand.create({ data: { id: uuid(), name: "Apple" } });
  const philco = await prisma.brand.create({ data: { id: uuid(), name: "Philco" } });
  const asus = await prisma.brand.create({ data: { id: uuid(), name: "Asus" } });
  const lg = await prisma.brand.create({ data: { id: uuid(), name: "LG" } });
  const lacost = await prisma.brand.create({ data: { id: uuid(), name: "Lacost" } });

  const eletronics = await prisma.category.create({
    data: {
      id: uuid(),
      name: "Eletrônicos",
      slug: slugify("Eletrônicos", { lower: true }),
    },
  });
  const computing = await prisma.category.create({
    data: {
      id: uuid(),
      name: "Informatica",
      slug: slugify("Informatica", { lower: true }),
    },
  });
  const fashion = await prisma.category.create({
    data: {
      id: uuid(),
      name: "Moda",
      slug: slugify("Moda", { lower: true }),
    },
  });
  const home = await prisma.category.create({
    data: {
      id: uuid(),
      name: "Casa",
      slug: slugify("Casa", { lower: true }),
    },
  });
  const sports = await prisma.category.create({
    data: {
      id: uuid(),
      name: "Esportes",
      slug: slugify("Esportes", { lower: true }),
    },
  });

  const promotion = await prisma.promotion.create({
    data: {
      title: "Desconto de Verão",
      discount: 15.0,
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      isActive: true,
    },
  });

  await createProduct("Smartphone Samsung S10 Plus 128GB", 2150.0, samsung, eletronics, promotion, samsung_I);
  await createProduct("Smartphone Motorola Moto G20 64GB", 3500, motorola, eletronics, promotion, motorola_I);
  await createProduct("Notebook Dell Inspiron 15 3000", 5600.0, dell, computing, promotion, notebook_I);
  await createProduct("Camiseta Estampada", 80.0, lacost, fashion, promotion, shirt_I);
  await createProduct("Tênis Nike Air Max", 500.0, nike, sports, promotion, tennis_I);
  await createProduct("Relógio Inteligente", 322.99, apple, fashion, promotion, watch_I);
  await createProduct("Fone de Ouvido Bluetooth", 324.99, apple, eletronics, promotion, earphones_I);
  await createProduct("Cafeteira Elétrica", 310.0, philco, home, promotion, coffee_maker_I);
  await createProduct("Mesa de Escritório", 235.0, philco, home, promotion, desk_I);
  await createProduct("Monitor LG 24", 846.0, lg, computing, promotion, monitor_I);
  await createProduct("Cadeira Gamer Thunder X3", 3000.0, asus, home, promotion, chair_I);

  console.log("Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
