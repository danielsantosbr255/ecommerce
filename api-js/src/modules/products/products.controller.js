const service = require("./products.service");
const { ANSIColors } = require("../../scripts/colors");
const CustomError = require("../../common/utils/CustomError");

class ProductController {
  constructor() {
    this.service = service;
  }

  create = async (req, res) => {
    if (!req.ability.can("manage", "Product")) throw new CustomError("Acesso negado!", 403);
    if (req.files && req.files.length > 0) req.body.images = req.files;

    const product = await this.service.create(req.body);
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
    if (req.files && req.files.length > 0) req.body.images = req.files;

    const product = await this.service.update(req.params.id, req.body);
    res.json(product);
  };

  remove = async (req, res) => {
    if (!req.ability.can("manage", "Product")) throw new CustomError("Acesso negado!", 403);

    await this.service.remove(req.params.id);
    res.json({ message: "Produto deletado com sucesso" });
  };
}

module.exports = new ProductController();
