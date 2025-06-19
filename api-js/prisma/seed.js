// prisma/seed.ts
const uuid = require("uuid").v4;
const slugify = require("slugify");
const authUtil = require("../src/common/utils/auth.util");
const { prisma } = require("../src/common/database/prisma");

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

  const admin = await prisma.user.create({
    data: {
      id: uuid(),
      name: "Admin",
      email: "admin@email.com",
      password: await authUtil.hashPassword("gGCxU34aueNKwK"),
      role: "ADMIN",
    },
  });

  // #region | Brands
  const samsung = await prisma.brand.create({
    data: {
      id: uuid(),
      name: "Samsung",
      slug: slugify("Samsung", { lower: true }),
      image: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746059286/Samsung-logo_tcpf7o.png",
    },
  });
  const motorola = await prisma.brand.create({
    data: {
      id: uuid(),
      name: "Motorola",
      slug: slugify("Motorola", { lower: true }),
      image: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746059286/Motorola-logo_ho5aio.png",
    },
  });
  const aoc = await prisma.brand.create({
    data: {
      id: uuid(),
      name: "AOC",
      slug: slugify("AOC", { lower: true }),
      image: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111613/aoc-logo_itos4y.png",
    },
  });
  const dell = await prisma.brand.create({
    data: {
      id: uuid(),
      name: "Dell",
      slug: slugify("Dell", { lower: true }),
      image: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746059287/Dell-logo_ccq9uh.png",
    },
  });
  const nike = await prisma.brand.create({
    data: {
      id: uuid(),
      name: "Nike",
      slug: slugify("Nike", { lower: true }),
      image: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746059283/nike-logo_zdq1i9.png",
    },
  });
  const apple = await prisma.brand.create({
    data: {
      id: uuid(),
      name: "Apple",
      slug: slugify("Apple", { lower: true }),
      image: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746059283/apple-logo_hbwe6y.png",
    },
  });
  const philco = await prisma.brand.create({
    data: {
      id: uuid(),
      name: "Philco",
      slug: slugify("Philco", { lower: true }),
      image: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746059285/Philco-logo_kocw0c.png",
    },
  });
  const redragon = await prisma.brand.create({
    data: {
      id: uuid(),
      name: "Redragon",
      slug: slugify("Redragon", { lower: true }),
      image: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746129139/redragon-logo_h7ynm1.png",
    },
  });
  const logitech = await prisma.brand.create({
    data: {
      id: uuid(),
      name: "Logitech",
      slug: slugify("Logitech", { lower: true }),
      image: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746129138/logitech-logo_wap8pt.png",
    },
  });
  const asus = await prisma.brand.create({
    data: {
      id: uuid(),
      name: "Asus",
      slug: slugify("Asus", { lower: true }),
      image: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746059285/Asus-logo_v53nyd.png",
    },
  });
  const lg = await prisma.brand.create({
    data: {
      id: uuid(),
      name: "LG",
      slug: slugify("LG", { lower: true }),
      image: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746059284/LG-logo_ovaku2.png",
    },
  });
  const lacost = await prisma.brand.create({
    data: {
      id: uuid(),
      name: "Lacost",
      slug: slugify("Lacost", { lower: true }),
      image: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746059284/lacoste-logo_zztltn.png",
    },
  });
  const ikea = await prisma.brand.create({
    data: {
      id: uuid(),
      name: "Ikea",
      slug: slugify("Ikea", { lower: true }),
      image: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746128420/ikea-logo_ayo4oc.png",
    },
  });
  const sony = await prisma.brand.create({
    data: {
      id: uuid(),
      name: "Sony",
      slug: slugify("Sony", { lower: true }),
      image: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746110485/sony-logo_acjk7a.png",
    },
  });
  const thunderX3 = await prisma.brand.create({
    data: {
      id: uuid(),
      name: "ThunderX3",
      slug: slugify("ThunderX3", { lower: true }),
      image: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746129572/thunderx3-logo_nai8kb.png",
    },
  });
  const electrolux = await prisma.brand.create({
    data: {
      id: uuid(),
      name: "Electrolux",
      slug: slugify("Electrolux", { lower: true }),
      image: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746193765/electrolux-logo_axnggn.png",
    },
  });

  // #endregion

  // #region | Categories
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
  const furniture = await prisma.category.create({
    data: {
      id: uuid(),
      name: "Moveis",
      slug: slugify("Moveis", { lower: true }),
    },
  });
  const gaming = await prisma.category.create({
    data: {
      id: uuid(),
      name: "Gamming",
      slug: slugify("Gamming", { lower: true }),
    },
  });
  const peripherals = await prisma.category.create({
    data: {
      id: uuid(),
      name: "Periféricos",
      slug: slugify("Periféricos", { lower: true }),
    },
  });
  const kitchen = await prisma.category.create({
    data: {
      id: uuid(),
      name: "Cozinha",
      slug: slugify("Cozinha", { lower: true }),
    },
  });
  const sports = await prisma.category.create({
    data: {
      id: uuid(),
      name: "Esportes",
      slug: slugify("Esportes", { lower: true }),
    },
  });
  // #endregion

  // #region | Products
  const smartphoneMotorola = await prisma.product.create({
    data: {
      title: "Smartphone Motorola Moto G20 64GB - 4GB RAM, Tela 6.5'', Câmera Tripla 48MP",
      slug: slugify("Smartphone Motorola Moto G20 64GB", { lower: true }),
      description:
        "O Motorola Moto G20 combina desempenho e estilo com seu processador octa-core, tela HD+ de 6.5 polegadas e câmera tripla de 48MP. Ideal para multitarefas e fotos de alta qualidade.",
      price: 1299.99,
      stock: 650,
      brandId: motorola.id,
      categoryId: eletronics.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111342/smartphone-motorola_ctfpxk.webp",
            alt: "Smartphone Motorola Moto G20 64GB na cor rosa",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Cor", value: "Rosa" },
          { name: "Memória Interna", value: "64GB" },
          { name: "RAM", value: "4GB" },
          { name: "Tela", value: "6.5'' HD+" },
          { name: "Câmera Traseira", value: "48MP + 8MP + 2MP" },
          { name: "Bateria", value: "5000mAh" },
          { name: "Sistema Operacional", value: "Android 11" },
        ],
      },
    },
  });
  const smartphoneSamsung = await prisma.product.create({
    data: {
      title: "Smartphone Samsung Galaxy S10 Plus 128GB - 8GB RAM, Tela 6.4'' Dynamic AMOLED",
      slug: slugify("Smartphone Samsung S10 Plus 128GB", { lower: true }),
      description:
        "O Samsung Galaxy S10 Plus oferece desempenho premium com processador Snapdragon 855, tela Dynamic AMOLED 2X e câmera tripla versátil. Inclui carregamento sem fio e resistência à água.",
      price: 3199.99,
      stock: 500,
      brandId: samsung.id,
      categoryId: eletronics.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111344/smartphone-samsung-galaxy-a35_yqstlh.webp",
            alt: "Smartphone Samsung Galaxy S10 Plus na cor preta",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Cor", value: "Preto" },
          { name: "Memória Interna", value: "128GB" },
          { name: "RAM", value: "8GB" },
          { name: "Tela", value: "6.4'' Dynamic AMOLED" },
          { name: "Câmera Traseira", value: "12MP + 12MP + 16MP" },
          { name: "Bateria", value: "4100mAh" },
          { name: "Resistência", value: "IP68" },
        ],
      },
    },
  });
  const tshirt = await prisma.product.create({
    data: {
      title: "Camiseta Lacoste Classic Fit - Algodão Pima, Logo de Crocodilo",
      slug: slugify("Camiseta Lacoste Classic Fit", { lower: true }),
      description:
        "A clássica camiseta Lacoste em algodão pima, com o icônico logo de crocodilo no peito. Corte reto e confortável para uso casual ou esportivo.",
      price: 349.9,
      stock: 100,
      brandId: lacost.id,
      categoryId: fashion.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111321/t-shirt_ep34ev.jpg",
            alt: "Camiseta Lacoste Classic Fit verde com logo de crocodilo",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Cor", value: "Verde" },
          { name: "Tamanho", value: "M" },
          { name: "Material", value: "100% Algodão Pima" },
          { name: "Modelo", value: "Classic Fit" },
          { name: "Origem", value: "França" },
        ],
      },
    },
  });
  const tennis = await prisma.product.create({
    data: {
      title: "Tênis Nike Air Max 90 - Cushioning, Design Retro",
      slug: slugify("Tênis Nike Air Max 90", { lower: true }),
      description:
        "O clássico Tênis Nike Air Max 90 combina estilo retrô com tecnologia de amortecimento visível. Ideal para uso casual com máximo conforto.",
      price: 799.99,
      stock: 35,
      brandId: nike.id,
      categoryId: sports.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111350/tennis-nike-air-max_fbf5i0.jpg",
            alt: "Tênis Nike Air Max 90 branco e vermelho",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Cor", value: "Branco/Vermelho" },
          { name: "Numeração", value: "42" },
          { name: "Material", value: "Couro sintético e malha" },
          { name: "Tecnologia", value: "Air Max" },
          { name: "Indicado para", value: "Casual/Esporte" },
        ],
      },
    },
  });
  const smartwatch = await prisma.product.create({
    data: {
      title: "Apple Watch Series 7 - 45mm, GPS + Cellular, Caixa em Alumínio",
      slug: slugify("Apple Watch Series 7", { lower: true }),
      description:
        "O Apple Watch Series 7 oferece tela sempre ativa maior, monitoramento de saúde avançado e resistência à água. Compatível com iPhone e apps de fitness.",
      price: 4299.0,
      stock: 60,
      brandId: apple.id,
      categoryId: eletronics.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111347/smartwatch-preto_olhyxd.jpg",
            alt: "Apple Watch Series 7 preto com pulseira esportiva",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Cor", value: "Preto" },
          { name: "Tamanho", value: "45mm" },
          { name: "Conectividade", value: "GPS + Cellular" },
          { name: "Resistência", value: "50m (WR50)" },
          { name: "Bateria", value: "Até 18 horas" },
          { name: "Sistema", value: "watchOS 8" },
        ],
      },
    },
  });
  const smarttv = await prisma.product.create({
    data: {
      title: "Smart TV AOC 50'' 4K UHD - Android TV, HDR10, 3 HDMI",
      slug: slugify("Smart TV AOC 50 polegadas 4K", { lower: true }),
      description:
        "A Smart TV AOC 50 polegadas oferece resolução 4K UHD com tecnologia HDR10, sistema Android TV e acesso a milhares de aplicativos e conteúdos em streaming.",
      price: 2399.0,
      stock: 50,
      brandId: aoc.id,
      categoryId: eletronics.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111345/smart-tv_jbhwuv.webp",
            alt: "Smart TV AOC 50 polegadas 4K UHD",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Tela", value: "50'' 4K UHD" },
          { name: "Sistema", value: "Android TV" },
          { name: "Conexões", value: "3 HDMI, 2 USB" },
          { name: "HDR", value: "HDR10" },
          { name: "Wi-Fi", value: "Dual Band" },
        ],
      },
    },
  });
  const headphone = await prisma.product.create({
    data: {
      title: "Fone de Ouvido Sony WH-CH510 - Bluetooth, 35h de Bateria",
      slug: slugify("Fone de Ouvido Sony WH-CH510", { lower: true }),
      description:
        "Fones de ouvido sem fio Sony com Bluetooth, design leve e confortável, e incríveis 35 horas de autonomia. Qualidade de som premium para seu dia a dia.",
      price: 299.0,
      stock: 80,
      brandId: sony.id,
      categoryId: eletronics.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111326/headfone-wireless_sbkzmj.jpg",
            alt: "Fone de Ouvido Sony WH-CH510 branco",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Cor", value: "Branco" },
          { name: "Tipo", value: "On-ear" },
          { name: "Bateria", value: "35 horas" },
          { name: "Bluetooth", value: "5.0" },
          { name: "Peso", value: "132g" },
        ],
      },
    },
  });
  const notebook = await prisma.product.create({
    data: {
      title: "Notebook Dell Inspiron 15 3000 - i5 11ª Ger, 8GB RAM, SSD 256GB",
      slug: slugify("Notebook Dell Inspiron 15 3000", { lower: true }),
      description:
        "Notebook Dell Inspiron com processador Intel Core i5 de 11ª geração, tela Full HD de 15.6'' e armazenamento rápido em SSD. Ideal para produtividade e entretenimento.",
      price: 3899.0,
      stock: 50,
      brandId: dell.id,
      categoryId: computing.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111334/notebook-dell_hknibz.jpg",
            alt: "Notebook Dell Inspiron 15 3000 prata",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Processador", value: "Intel Core i5-1135G7" },
          { name: "Memória RAM", value: "8GB DDR4" },
          { name: "Armazenamento", value: "SSD 256GB" },
          { name: "Tela", value: "15.6'' Full HD" },
          { name: "Sistema", value: "Windows 11" },
        ],
      },
    },
  });
  const coffeemaker = await prisma.product.create({
    data: {
      title: "Cafeteira Electrolux 15 Bares - Café Expresso e Cappuccino",
      slug: slugify("Cafeteira Electrolux 15 Bares", { lower: true }),
      description:
        "Prepare cafés expressos e cappuccinos perfeitos com a Cafeteira Electrolux de 15 bares. Inclui porta-filtro e bico vaporizador para leite.",
      price: 499.0,
      stock: 30,
      brandId: electrolux.id,
      categoryId: kitchen.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111323/cafeteira-electrolux_afg63e.png",
            alt: "Cafeteira Electrolux 15 bares preta",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Pressão", value: "15 bar" },
          { name: "Potência", value: "1100W" },
          { name: "Capacidade", value: "1.2L" },
          { name: "Funções", value: "Expresso e Cappuccino" },
          { name: "Cor", value: "Preta" },
        ],
      },
    },
  });
  const officeDesk = await prisma.product.create({
    data: {
      title: "Mesa de Escritório Ikea - MDF 25mm, 140x140cm",
      slug: slugify("Mesa de Escritório Ikea", { lower: true }),
      description:
        "Mesa de escritório com acabamento moderno e estrutura robusta em MDF de 25mm. Ideal para home office ou escritório corporativo.",
      price: 799.0,
      stock: 40,
      brandId: ikea.id,
      categoryId: furniture.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111336/office-desk_et12fj.webp",
            alt: "Mesa de Escritório Ikea",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Material", value: "MDF 25mm" },
          { name: "Dimensões", value: "140x140x75cm" },
          { name: "Cor", value: "Marrom" },
          { name: "Peso Suportado", value: "50kg" },
        ],
      },
    },
  });
  const soundBox = await prisma.product.create({
    data: {
      title: "Caixa de Som LG XBOOM Go PL5 - Bluetooth, 20W, à Prova d'Água",
      slug: slugify("Caixa de Som LG XBOOM Go PL5", { lower: true }),
      description:
        "Caixa de som portátil LG com Bluetooth, potência de 20W e resistência à água IPX5. Bateria de longa duração e som surround de alta qualidade.",
      price: 699.0,
      stock: 60,
      brandId: lg.id,
      categoryId: eletronics.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111349/sound-box_ftcduw.webp",
            alt: "Caixa de Som LG XBOOM Go PL5 preta",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Potência", value: "20W RMS" },
          { name: "Bluetooth", value: "5.0" },
          { name: "Bateria", value: "Até 18 horas" },
          { name: "Resistência", value: "IPX5" },
          { name: "Peso", value: "0.9kg" },
        ],
      },
    },
  });
  const refrigerator = await prisma.product.create({
    data: {
      title: "Geladeira/Refrigerador Philco Inverse 375L - Frost Free, Inox",
      slug: slugify("Geladeira Philco Inverse 375L", { lower: true }),
      description:
        "Geladeira Philco Inverse com 375 litros, tecnologia Frost Free e design em aço inox. Prateleiras em vidro temperado e gavetão para legumes.",
      price: 2899.0,
      stock: 60,
      brandId: philco.id,
      categoryId: home.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111340/refrigerator_jusaja.jpg",
            alt: "Geladeira Philco Inverse 375L inox",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Capacidade", value: "375 litros" },
          { name: "Tipo", value: "Frost Free" },
          { name: "Cor", value: "Inox" },
          { name: "Consumo", value: "53 kWh/mês" },
          { name: "Garantia", value: "1 ano" },
        ],
      },
    },
  });
  const monitorLG = await prisma.product.create({
    data: {
      title: "Monitor LG 24MP60G-B 24'' Full HD IPS - 75Hz, HDMI/VGA",
      slug: slugify("Monitor LG 24MP60G-B Full HD IPS", { lower: true }),
      description:
        "Monitor LG Full HD IPS de 24 polegadas com taxa de atualização de 75Hz e tecnologia AMD FreeSync. Ideal para trabalho e entretenimento.",
      price: 899.0,
      stock: 60,
      brandId: lg.id,
      categoryId: peripherals.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111331/monitor-lg_oixwau.jpg",
            alt: "Monitor LG 24MP60G-B Full HD IPS preto",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Tela", value: "24'' Full HD IPS" },
          { name: "Taxa de Atualização", value: "75Hz" },
          { name: "Tempo de Resposta", value: "5ms" },
          { name: "Conexões", value: "HDMI, VGA" },
          { name: "VESA", value: "75x75mm" },
        ],
      },
    },
  });
  const keyboard = await prisma.product.create({
    data: {
      title:
        "Teclado Sem Fio Mecânico Gamer Redragon Gloria Pro, Switch Marrom, USB e Bluetooth, ABNT2, Branco - K664WBP-RGB-PRO (PT-BUMBLEBEE)",
      slug: slugify("Teclado Sem Fio Mecânico Gamer Redragon Gloria Pro", { lower: true }),
      description:
        "O teclado mecânico gamer Redragon Gloria Pro RGB combina estilo e praticidade em um formato compacto, ideal para quem busca desempenho sem abrir mão de espaço. Com um layout ABNT2, pensado especialmente para o mercado brasileiro, e números na lateral, ele é perfeito para atender às necessidades de gamers e profissionais que valorizam um equipamento completo e funcional.",
      price: 498.99,
      stock: 90,
      brandId: redragon.id,
      categoryId: peripherals.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746128983/teclado-sem-fio-mecanico-gamer-redragon_et7giu.webp",
            alt: "Teclado Sem Fio Mecânico Gamer Redragon Gloria Pro",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Tipo", value: "Mecânico" },
          { name: "Switch", value: "Redragon Bumblebee" },
          { name: "Layout", value: "ABNT2" },
          { name: "Iluminação", value: "RGB Redragon Chroma Mk.II" },
          { name: "Anti-ghosting", value: "100% Teclas" },
          { name: "Bateria", value: "3000mAh" },
          { name: "Comprimento do cabo", value: "1.5m aproximadamente" },
        ],
      },
    },
  });
  const playStation5 = await prisma.product.create({
    data: {
      title: "Console PlayStation 5 Digital Edition - SSD 825GB, Controle DualSense",
      slug: slugify("PlayStation 5 Digital Edition", { lower: true }),
      description:
        "O PlayStation 5 Digital Edition oferece experiência de jogo next-gen com SSD ultrarrápido, ray tracing e controle DualSense com feedback háptico.",
      price: 4299.0,
      stock: 30,
      brandId: sony.id,
      categoryId: gaming.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111324/console-ps5_p9zncd.webp",
            alt: "Console PlayStation 5 Digital Edition branco",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Armazenamento", value: "SSD 825GB" },
          { name: "Resolução", value: "Até 8K" },
          { name: "Taxa de Quadros", value: "Até 120fps" },
          { name: "Controle", value: "DualSense" },
          { name: "Compatibilidade", value: "PS4/PS5" },
        ],
      },
    },
  });
  const mouse = await prisma.product.create({
    data: {
      title: "Mouse Gamer Logitech Wireless Superlight - 16.000 DPI, Switch Optical",
      slug: slugify("Mouse Gamer Logitech Wireless Superlight", { lower: true }),
      description:
        "Mouse gamer sem fio Logitech com sensor óptico de 16.000 DPI, switches ópticos e design leve para jogos competitivos.",
      price: 599.0,
      stock: 25,
      brandId: logitech.id,
      categoryId: peripherals.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111333/mouse-wireless-logitec-superlight_kkzmq3.webp",
            alt: "Mouse Gamer Logitech Wireless Superlight Branco",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Cor", value: "Branco" },
          { name: "DPI", value: "16.000" },
          { name: "Tipo", value: "Wireless" },
          { name: "Switches", value: "Ópticos" },
          { name: "Peso", value: "69g" },
          { name: "Bateria", value: "Até 150h" },
        ],
      },
    },
  });
  const projector = await prisma.product.create({
    data: {
      title: "Projetor Samsung The Freestyle - Full HD, Smart TV, 360°",
      slug: slugify("Projetor Samsung The Freestyle", { lower: true }),
      description:
        "Projetor inteligente Samsung The Freestyle com Full HD, sistema Smart TV e design compacto que projeta em qualquer superfície com ajuste de 360°.",
      price: 4999.0,
      stock: 20,
      brandId: samsung.id,
      categoryId: eletronics.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111337/projetor-samsung_evyegc.webp",
            alt: "Projetor Samsung The Freestyle branco",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Resolução", value: "Full HD" },
          { name: "Luminosidade", value: "550 LED Lumens" },
          { name: "Sistema", value: "Smart TV" },
          { name: "Conexão", value: "Wi-Fi, Bluetooth" },
          { name: "Portabilidade", value: "0.8kg" },
        ],
      },
    },
  });
  const cadeiraGamer = await prisma.product.create({
    data: {
      title: "Cadeira Gamer ThunderX3 BC3 - Reclinável, Apoio Lombar, 180°",
      slug: slugify("Cadeira Gamer ThunderX3 BC3", { lower: true }),
      description:
        "Cadeira gamer ThunderX3 BC3 com design ergonômico, apoio lombar ajustável e reclinação de 180°. Estrutura em aço reforçado para maior durabilidade.",
      price: 1299.0,
      stock: 25,
      brandId: thunderX3.id,
      categoryId: furniture.id,
      images: {
        create: [
          {
            url: "https://res.cloudinary.com/drhdpmlzh/image/upload/v1746111321/cadeira-gamer-thunder-x3_lnrltj.jpg",
            alt: "Cadeira Gamer ThunderX3 BC3 preta e vermelha",
          },
        ],
      },
      specifications: {
        create: [
          { name: "Reclinagem", value: "Até 180°" },
          { name: "Apoio Lombar", value: "Ajustável" },
          { name: "Material", value: "Couro Sintético" },
          { name: "Estrutura", value: "Aço" },
          { name: "Peso Suportado", value: "150kg" },
        ],
      },
    },
  });
  // #endregion

  // #region | Promotions
  const promotion = await prisma.promotion.create({
    data: {
      title: "Super Desconto de Primavera",
      slug: slugify("Super Desconto de Primavera", { lower: true }),
      description:
        "Aproveite a estação das flores com descontos incríveis em toda a nossa linha de produtos! Renove sua casa e seu guarda-roupa com ofertas que você não pode perder.",
      discount: 20.0,
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      isActive: true,
    },
  });
  const promotion1 = await prisma.promotion.create({
    data: {
      title: "Liquidação Relâmpago: Só Hoje!",
      slug: slugify("Liquidação Relâmpago: Só Hoje!", { lower: true }),
      description:
        "Os melhores preços do ano estão aqui — e só por algumas horas! Garanta os seus favoritos com descontos especiais antes que acabe. Promoção válida somente hoje!",
      discount: 15.0,
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      isActive: true,
    },
  });
  const promotion2 = await prisma.promotion.create({
    data: {
      title: "Descontos de Respeito! Seu bolso agradece",
      slug: slugify("Descontos de Respeito! Seu bolso agradece", { lower: true }),
      description:
        "Aquele produto que você queria? Agora tá com precinho camarada! Vem garantir o seu com até 50% de desconto. Mas não marca bobeira — é só até acabarem os estoques!",
      discount: 15.0,
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      isActive: true,
    },
  });
  // #endregion

  // #region | PromotionProducts
  await prisma.promotionProduct.createMany({
    data: [
      {
        promotionId: promotion.id,
        productId: mouse.id,
      },
      {
        promotionId: promotion.id,
        productId: projector.id,
      },
      {
        promotionId: promotion.id,
        productId: cadeiraGamer.id,
      },
    ],
  });
  await prisma.promotionProduct.createMany({
    data: [
      {
        promotionId: promotion1.id,
        productId: tennis.id,
      },
      {
        promotionId: promotion1.id,
        productId: tshirt.id,
      },
      {
        promotionId: promotion1.id,
        productId: smartwatch.id,
      },
    ],
  });
  await prisma.promotionProduct.createMany({
    data: [
      {
        promotionId: promotion2.id,
        productId: headphone.id,
      },
      {
        promotionId: promotion2.id,
        productId: soundBox.id,
      },
      {
        promotionId: promotion2.id,
        productId: monitorLG.id,
      },
      {
        promotionId: promotion2.id,
        productId: keyboard.id,
      },
      {
        promotionId: promotion2.id,
        productId: mouse.id,
      },
    ],
  });
  // #endregion

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
