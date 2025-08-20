const slugify = require("slugify");
const service = require("./products.service");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/product.validator");
const queryValidator = require("../../common/validators/query.validator");

const formatData = (data) => {
  if (data.title) data.slug = slugify(data.title, { lower: true });
  if (data.price) data.price = parseInt(data.price);
  if (data.stock) data.stock = parseInt(data.stock);
  if (data.rating) data.rating = parseInt(data.rating);
  if (data.discount) data.discount = parseInt(data.discount);
  if (data.isActive) data.isActive = Boolean(data.isActive);
  if (data.keptImages) data.keptImages = JSON.parse(data.keptImages || "[]");
  else data.keptImages = [];

  if (data.specifications) {
    if (!data.specifications.length) delete data.specifications;
    else data.specifications = JSON.parse(data.specifications || "[]");
  }
  return data;
};

class ProductController {
  constructor() {
    this.service = service;
  }

  create = async (req, res) => {
    if (!req.ability.can("manage", "Product")) throw new CustomError("Acesso negado!", 403);
    if (req.files && req.files.length > 0) req.body.images = req.files;

    const data = formatData(req.body);
    const validatedData = validator.create(data);

    const product = await this.service.create(validatedData);
    res.status(201).json(product);
  };

  getMany = async (req, res) => {
    console.log("Fetching products with query:", req.query);
    const query = queryValidator.products(req.query);
    const result = await this.service.getMany(query);
    res.json(result);
  };

  getById = async (req, res) => {
    const product = await this.service.getById(req.params.id);
    res.json(product);
  };

  getBySlug = async (req, res) => {
    const product = await this.service.getBySlug(req.params.slug);
    res.json(product);
  };

  getRelated = async (req, res) => {
    const result = await this.service.getRelated(req.params.id);
    res.json(result);
  };

  getCount = async (req, res) => {
    const result = await this.service.getCount(req.query);
    res.json(result);
  };

  getBestSellers = async (req, res) => {
    const result = await this.service.getBestSellers();
    res.json(result);
  };

  getNewArrivals = async (req, res) => {
    const result = await this.service.getNewArrivals();
    res.json(result);
  };

  update = async (req, res) => {
    if (!req.ability.can("manage", "Product")) throw new CustomError("Acesso negado!", 403);
    if (req.files && req.files.length > 0) req.body.images = req.files;

    const data = formatData(req.body);
    const validatedData = validator.update(data);

    const product = await this.service.update(req.params.id, validatedData);
    res.json(product);
  };

  remove = async (req, res) => {
    if (!req.ability.can("manage", "Product")) throw new CustomError("Acesso negado!", 403);

    await this.service.remove(req.params.id);
    res.json({ message: "Produto deletado com sucesso" });
  };
}

module.exports = new ProductController();
