const service = require("./brands.service");

class BrandController {
  constructor() {
    this.service = service;
  }

  create = async (req, res) => {
    if (!req.ability.can("manage", "Brand")) throw new CustomError("Acesso negado!", 403);

    const brand = await this.service.create(req.body);
    res.json(brand);
  };

  getAll = async (req, res) => {
    const brands = await this.service.getAll();
    res.json(brands);
  };

  getBySlug = async (req, res) => {
    const brand = await this.service.getBySlug(req.params.slug);
    res.json(brand);
  };

  update = async (req, res) => {
    if (!req.ability.can("manage", "Brand")) throw new CustomError("Acesso negado!", 403);

    const brand = await this.service.update(req.params.slug, req.body);
    res.json(brand);
  };

  remove = async (req, res) => {
    if (!req.ability.can("manage", "Brand")) throw new CustomError("Acesso negado!", 403);

    await this.service.remove(req.params.slug);
    res.status(200).json({ message: "Marca deletada com sucesso" });
  };
}

module.exports = new BrandController();
