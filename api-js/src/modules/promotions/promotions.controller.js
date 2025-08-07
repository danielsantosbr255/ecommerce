const service = require("./promotions.service");
const CustomError = require("../../common/utils/CustomError");

class PromotionController {
  constructor() {
    this.service = service;
  }

  create = async (req, res) => {
    if (!req.ability.can("manage", "Promotion")) throw new CustomError("Acesso negado!", 403);

    const promotion = await this.service.create(req.body);
    res.json(promotion);
  };

  getAll = async (req, res) => {
    const promotions = await this.service.getAll();
    res.json(promotions);
  };

  getBySlug = async (req, res) => {
    const promotion = await this.service.getBySlug(req.params.slug);
    res.json(promotion);
  };

  update = async (req, res) => {
    if (!req.ability.can("manage", "Promotion")) throw new CustomError("Acesso negado!", 403);

    const promotion = await this.service.update(req.params.slug, req.body);
    res.json(promotion);
  };

  remove = async (req, res) => {
    if (!req.ability.can("manage", "Promotion")) throw new CustomError("Acesso negado!", 403);

    await this.service.remove(req.params.slug);
    res.status(200).json({ message: "Promocao deletada com sucesso" });
  };
}

module.exports = new PromotionController();
