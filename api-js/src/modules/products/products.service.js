const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/product.validator");
const { uploadToCloudinary } = require("../../common/utils/cloudinary.util");

const createProduct = async (data) => {
  const existingProduct = await prisma.product.findUnique({ where: { slug: data.slug } });
  if (existingProduct) throw new CustomError("Já existe um produto com este slug");

  const uploadResults = await Promise.all(
    data.images.map((image) =>
      uploadToCloudinary(image.buffer, {
        folder: "ecommerce/products",
        transformation: [{ width: 800, height: 800, crop: "limit" }, { quality: "auto" }],
      })
    )
  );

  const product = await prisma.product.create({
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
    include: { images: true, specifications: true, category: true },
  });

  return product;
};

const getProducts = () => {
  return prisma.product.findMany({
    include: { images: true, specifications: true, category: true },
  });
};

const getProductBySlug = async (slug) => {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { images: true, specifications: true, category: true, brand: true },
  });

  if (!product) throw new CustomError("Produto não encontrado!", 404);

  const relatedProducts = await prisma.product.findMany({
    where: { categoryId: product.categoryId, NOT: { slug: product.slug } },
    include: { images: true, specifications: true, category: true },
    take: 5,
  });

  return { product, relatedProducts };
};

const getProductsByCategory = (slug) => {
  return prisma.product.findMany({
    where: { category: { slug } },
    include: { images: true, specifications: true, category: true },
  });
};

const getProductsByBrand = (brand) => {
  return prisma.product.findMany({
    where: { brand: { name: brand } },
    include: { images: true, specifications: true, category: true },
  });
};

const getProductsByQuery = (query) => {
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

const updateProduct = async (id, title, description, price, stock, category, image) => {
  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) throw new CustomError("Produto não encontrado!", 404);

  const validatedData = validator.update({ title, description, price, stock, category, image });
  return prisma.product.update({ where: { id }, data: validatedData });
};

const deleteProduct = async (id) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new CustomError("Produto não encontrado!", 404);

  // if (product.image) {
  //     const oldImagePath = path.join(__dirname, "../../..", product.image);
  //     fs.unlink(oldImagePath, (err) => {
  //         if (err) console.error("Erro ao deletar imagem antiga:", err);
  //     });
  // }
  return prisma.product.delete({ where: { id } });
};

module.exports = {
  createProduct,
  getProducts,
  getProductsByQuery,
  getProductsByCategory,
  getProductsByBrand,
  getProductBySlug,
  updateProduct,
  deleteProduct,
};
