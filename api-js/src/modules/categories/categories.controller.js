const service = require("./categories.service");
const CustomError = require("../../common/utils/CustomError");

class CategoryController {
  constructor() {
    this.service = service;
  }

  create = async (req, res) => {
    if (!req.ability.can("manage", "Category")) throw new CustomError("Acesso negado!", 403);
    const category = await this.service.create(req.body);
    res.json(category);
  };

  getAll = async (req, res) => {
    const categories = await this.service.getAll();
    res.json(categories);
  };

  getBySlug = async (req, res) => {
    const category = await this.service.getBySlug(req.params.slug);
    res.json(category);
  };

  update = async (req, res) => {
    if (!req.ability.can("manage", "Category")) throw new CustomError("Acesso negado!", 403);

    const category = await this.service.update(req.params.slug, req.body);
    res.json(category);
  };

  remove = async (req, res) => {
    if (!req.ability.can("manage", "Category")) throw new CustomError("Acesso negado!", 403);

    await this.service.remove(req.params.slug);
    res.status(200).json({ message: "Categoria deletada com sucesso" });
  };
}

module.exports = new CategoryController();
