const service = require("./cart.service");
const validator = require("../../common/validators/cart.validator");

class CartController {
  constructor() {
    this.service = service;
  }

  create = async (req, res) => {
    const validatedData = validator.create(req.body);
    const cart = await this.service.create({ userId: req.userId, ...validatedData });
    res.json(cart);
  };

  getMany = async (req, res) => {
    const cart = await this.service.getMany(req.query);
    res.json(cart);
  };

  getOne = async (req, res) => {
    const cart = await this.service.getOne(req.params.id);
    res.json(cart);
  };

  getByUserId = async (req, res) => {
    const id = req.params.id === "me" ? req.userId : req.params.id;
    const cart = await this.service.getByUserId(id);
    res.json(cart);
  };

  update = async (req, res) => {
    const validatedData = validator.update(req.body);
    const item = await this.service.update(req.params.id, validatedData);
    res.json(item);
  };

  removeCart = async (req, res) => {
    const cart = await this.service.removeCart({ userId: req.userId });
    res.json({ message: "Carrinho removido!", cart });
  };

  removeItem = async (req, res) => {
    const validatedData = validator.remove({ id: req.params.id });
    const item = await this.service.removeItem({ userId: req.userId, ...validatedData });
    res.json({ message: "Item removido do carrinho!", item });
  };
}

module.exports = new CartController();
