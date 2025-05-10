const slugify = require("slugify");
const services = require("./products.service");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/product.validator");

const createProduct = async (req, res) => {
  if (!req.ability.can("manage", "Product")) throw new CustomError("Acesso negado!", 403);

  if (req.body.slug) req.body.slug = slugify(req.body.slug, { lower: true });
  if (req.body.price) req.body.price = Number(req.body.price);
  if (req.body.stock) req.body.stock = Number(req.body.stock);
  if (req.body.rating) req.body.rating = Number(req.body.rating);
  if (req.body.discount) req.body.discount = Number(req.body.discount);
  if (req.body.isActive) req.body.isActive = Boolean(req.body.isActive);
  if (req.body.specifications) req.body.specifications = JSON.parse(req.body.specifications);

  const validatedData = validator.create({ ...req.body, images: req.files });
  const product = await services.createProduct(validatedData);
  return res.status(201).json(product);
};

const getProductBySlug = async (req, res) => {
  const product = await services.getProductBySlug(req.params.slug);
  return res.json(product);
};

const getProducts = async (req, res) => {
  const products = await services.getProducts();
  return res.json(products);
};

const getProductsByQuery = async (req, res) => {
  const products = await services.getProductsByQuery(req.params.query);
  return res.json(products);
};

const getProductsByBrand = async (req, res) => {
  const products = await services.getProductsByBrand(req.params.brand);
  return res.json(products);
};

const getProductsByCategory = async (req, res) => {
  const products = await services.getProductsByCategory(req.params.productId);
  return res.json(products);
};

const updateProduct = async (req, res) => {
  if (!req.ability.can("manage", "Product")) throw new CustomError("Acesso negado!", 403);

  const { title, description, price, stock, category } = req.body;
  const image = req.file;
  const id = req.params.id;

  const product = await services.updateProduct(id, title, description, price, stock, category, image);
  return res.json(product);
};

const deleteProduct = async (req, res) => {
  if (!req.ability.can("manage", "Product")) throw new CustomError("Acesso negado!", 403);

  const product = await services.deleteProduct(req.params.id);
  return res.json(product);
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug,
  getProductsByQuery,
  getProductsByBrand,
  getProductsByCategory,
};
