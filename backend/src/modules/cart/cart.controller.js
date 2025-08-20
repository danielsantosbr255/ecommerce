const service = require("./cart.service");
const validator = require("../../common/validators/cart.validator");

class CartController {
  constructor() {
    this.service = service;
  }

  addToCart = async (req, res) => {
    const validatedData = validator.create(req.body);
    const cart = await this.service.addItem({ userId: req.user.id, ...validatedData });
    res.json(cart);
  };

  getOwnCart = async (req, res) => {
    const cart = await this.service.getOwnCart(req.user.id);
    res.json(cart);
  };

  getCart = async (req, res) => {
    const cart = await this.service.getCart(req.params.id);
    res.json(cart);
  };

  updateItem = async (req, res) => {
    const validatedData = validator.update({ id: req.params.id, ...req.body });
    const item = await this.service.updateItem(validatedData);
    res.json(item);
  };

  removeCart = async (req, res) => {
    const cart = await this.service.removeCart({ userId: req.user.id });
    res.json({ message: "Carrinho removido!", cart });
  };

  removeItem = async (req, res) => {
    const validatedData = validator.remove({ id: req.params.id });
    const item = await this.service.removeItem({ userId: req.user.id, ...validatedData });
    res.json({ message: "Item removido do carrinho!", item });
  };
}

module.exports = new CartController();
