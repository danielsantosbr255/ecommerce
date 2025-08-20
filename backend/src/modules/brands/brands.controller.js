const service = require("./brands.service");
const CustomError = require("../../common/utils/CustomError");
const queryValidator = require("../../common/validators/query.validator");

class BrandController {
  constructor() {
    this.service = service;
  }

  create = async (req, res) => {
    if (!req.ability.can("manage", "Brand")) throw new CustomError("Acesso negado!", 403);

    const brand = await this.service.create(req.body);
    res.json(brand);
  };

  getMany = async (req, res) => {
    const query = queryValidator.brands(req.query);
    const result = await this.service.getMany(query);
    res.json(result);
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
