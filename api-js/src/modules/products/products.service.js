const repository = require("./products.repository");
const CustomError = require("../../common/utils/CustomError");
const { uploadToCloudinary } = require("../../common/utils/cloudinary.util");

const create = async (data) => {
  const existingProduct = await repository.getBySlug(data.slug);
  if (existingProduct) throw new CustomError("Já existe um produto com este slug");

  const uploadResults = await Promise.all(
    data.images.map((image) =>
      uploadToCloudinary(image.buffer, {
        folder: "ecommerce/products",
        transformation: [{ width: 800, height: 800, crop: "limit" }, { quality: "auto" }],
      })
    )
  );

  return repository.create({ data, uploadResults });
};

const getAll = () => {
  return repository.getAll();
};

const getBySlug = async (slug) => {
  return await repository.getBySlug(slug);
};

const getByCategory = async (productId) => {
  const product = await repository.getById(productId);
  if (!product) throw new CustomError("Produto nao encontrado", 404);

  return repository.getByCategory(product.categoryId, productId);
};

const getByBrand = (brand) => {
  return repository.getByBrand(brand);
};

const getByQuery = (query) => {
  return repository.getByQuery(query);
};

const update = async (id, data) => {
  const product = await repository.getById(id);
  if (!product) throw new CustomError("Produto não encontrado!", 404);

  return repository.update(id, data);
};

const remove = async (id) => {
  const product = await repository.getById(id);
  if (!product) throw new CustomError("Produto não encontrado!", 404);

  return repository.remove(id);
};

module.exports = { create, getAll, getByQuery, getByCategory, getByBrand, getBySlug, update, remove };
