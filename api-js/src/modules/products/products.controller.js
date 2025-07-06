const slugify = require("slugify");
const services = require("./products.service");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/product.validator");

const create = async (req, res) => {
  if (!req.ability.can("manage", "Product")) throw new CustomError("Acesso negado!", 403);

  if (req.body.slug) req.body.slug = slugify(req.body.slug, { lower: true });
  if (req.body.price) req.body.price = Number(req.body.price);
  if (req.body.stock) req.body.stock = Number(req.body.stock);
  if (req.body.rating) req.body.rating = Number(req.body.rating);
  if (req.body.discount) req.body.discount = Number(req.body.discount);
  if (req.body.isActive) req.body.isActive = Boolean(req.body.isActive);
  if (req.body.specifications) req.body.specifications = JSON.parse(req.body.specifications);
  if (req.files?.length) req.body.images = req.files;

  const validatedData = validator.create(req.body);
  const product = await services.create(validatedData);

  return res.status(201).json(product);
};

const getAll = async (req, res) => {
  const products = await services.getAll();
  return res.json(products);
};

const getBySlug = async (req, res) => {
  const product = await services.getBySlug(req.params.slug);
  return res.json(product);
};

const getByQuery = async (req, res) => {
  const products = await services.getByQuery(req.params.query);
  return res.json(products);
};

const getByBrand = async (req, res) => {
  const products = await services.getByBrand(req.params.brand);
  return res.json(products);
};

const getByCategory = async (req, res) => {
  const products = await services.getByCategory(req.params.productId);
  return res.json(products);
};

const update = async (req, res) => {
  if (!req.ability.can("manage", "Product")) throw new CustomError("Acesso negado!", 403);

  if (req.body.slug) req.body.slug = slugify(req.body.slug, { lower: true });
  if (req.body.price) req.body.price = Number(req.body.price);
  if (req.body.stock) req.body.stock = Number(req.body.stock);
  if (req.body.rating) req.body.rating = Number(req.body.rating);
  if (req.body.discount) req.body.discount = Number(req.body.discount);
  if (req.body.isActive) req.body.isActive = Boolean(req.body.isActive);
  if (req.body.specifications) req.body.specifications = JSON.parse(req.body.specifications);
  if (req.files?.length) req.body.images = req.files;

  const validatedData = validator.update(req.body);
  const product = await services.update(req.params.id, validatedData);

  return res.json(product);
};

const remove = async (req, res) => {
  if (!req.ability.can("manage", "Product")) throw new CustomError("Acesso negado!", 403);

  await services.remove(req.params.id);
  return res.json({ message: "Produto deletado com sucesso" });
};

module.exports = { getAll, create, update, remove, getBySlug, getByQuery, getByBrand, getByCategory };
