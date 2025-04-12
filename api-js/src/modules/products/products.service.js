const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/product.validator");
const cloudinary = require("../../common/utils/cloudinary.util");
const { Readable } = require("stream");

const bodyData = (data) => {
  const { title, description, price, stock, category, image } = data;

  return {
    ...(title !== undefined && { title }),
    ...(category !== undefined && { category }),
    ...(description !== undefined && { description }),
    ...(price !== undefined && { price: Number(price) }),
    ...(stock !== undefined && { stock: Number(stock) }),
    ...(image !== undefined && { image: image.originalname }),
  };
};

const getProducts = () => {
  return prisma.product.findMany();
};

const getProductById = (id) => {
  return prisma.product.findUnique({ where: { id } });
};

const getProductsByQuery = (query) => {
  return prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { category: { contains: query, mode: "insensitive" } },
      ],
    },
  });
};

const createProduct = async (title, description, price, stock, category, image) => {
  const validatedData = validator.create(bodyData({ title, description, price, stock, category, image }));

  if (validatedData.stock <= 0) throw new CustomError("Quantidade de estoque inválida!", 400);

  const imageUrl = await new Promise((resolve, reject) => {
    const bufferStream = new Readable();
    bufferStream.push(image.buffer);
    bufferStream.push(null);

    const stream = cloudinary.uploader.upload_stream({ folder: "ecommerce-images" }, (error, result) => {
      if (error) return reject(error);
      resolve(result.secure_url);
    });

    bufferStream.pipe(stream);
  });

  validatedData.image = imageUrl;
  console.log(validatedData.image);

  return prisma.product.create({ data: validatedData });
};

const updateProduct = async (id, title, description, price, stock, category, image) => {
  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) throw new CustomError("Produto não encontrado!", 404);

  const validatedData = validator.update(bodyData({ title, description, price, stock, category, image }));
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
  getProducts,
  getProductById,
  getProductsByQuery,
  createProduct,
  updateProduct,
  deleteProduct,
};
