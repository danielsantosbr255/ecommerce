const slugify = require("slugify");
const service = require("./products.service");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/product.validator");

class ProductController {
  constructor() {
    this.service = service;
  }

  create = async (req, res) => {
    if (!req.ability.can("manage", "Product")) throw new CustomError("Acesso negado!", 403);

    if (req.body.title) req.body.slug = slugify(req.body.title, { lower: true });
    if (req.body.price) req.body.price = parseInt(req.body.price);
    if (req.body.stock) req.body.stock = parseInt(req.body.stock);
    if (req.body.rating) req.body.rating = parseInt(req.body.rating);
    if (req.body.discount) req.body.discount = parseInt(req.body.discount);
    if (req.body.isActive) req.body.isActive = Boolean(req.body.isActive);
    if (req.body.specifications) req.body.specifications = JSON.parse(req.body.specifications);
    if (req.files?.length) req.body.images = req.files;

    console.log(req.body.specifications)
    const validatedData = validator.create(req.body);
    const product = await this.service.create(validatedData);

    res.status(201).json(product);
  };

  getAll = async (req, res) => {
    const result = await this.service.getAll(req.query);
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

    if (req.body.slug) req.body.slug = slugify(req.body.slug, { lower: true });
    if (req.body.price) req.body.price = parseInt(req.body.price);
    if (req.body.stock) req.body.stock = parseInt(req.body.stock);
    if (req.body.rating) req.body.rating = parseInt(req.body.rating);
    if (req.body.discount) req.body.discount = parseInt(req.body.discount);
    if (req.body.isActive) req.body.isActive = Boolean(req.body.isActive);
    if (req.body.specifications) req.body.specifications = JSON.parse(req.body.specifications);
    if (req.files?.length) req.body.images = req.files;

    const validatedData = validator.update(req.body);
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
