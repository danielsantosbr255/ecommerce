const CustomError = require("../../common/utils/CustomError");
const services = require("./products.service");

const createProduct = async (req, res) => {
  if (!req.ability.can("manage", "Product")) throw new CustomError("Acesso negado!", 403);

  const { title, description, price, stock, category } = req.body;
  const image = req.file;

  if (!image) throw new CustomError("Nenhum arquivo de imagem enviado.", 400);

  const product = await services.createProduct(title, description, price, stock, category, image);
  return res.status(201).json(product);
};

const getProductBySlug = async (req, res) => {
  const { product, relatedProducts } = await services.getProductBySlug(req.params.slug);
  return res.json({ product, relatedProducts });
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
  const products = await services.getProductsByCategory(req.params.slug);
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
