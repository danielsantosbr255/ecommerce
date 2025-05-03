const service = require("./cart.service");
const validator = require("../../common/validators/cart.validator");

const addToCart = async (req, res) => {
  const validatedData = validator.create(req.body);
  const cart = await service.addItem({ userId: req.user.id, ...validatedData });
  res.json(cart);
};

const getOwnCart = async (req, res) => {
  const cart = await service.getOwnCart(req.user.id);
  res.json(cart);
};

const getCart = async (req, res) => {
  const cart = await service.getCart(req.params.id);
  res.json(cart);
};

const updateItem = async (req, res) => {
  const validatedData = validator.update({ id: req.params.id, ...req.body });
  const item = await service.updateItem(validatedData);
  res.json(item);
};

const removeItem = async (req, res) => {
  const validatedData = validator.remove({ productId: req.params.productId });
  const item = await service.removeItem({ userId: req.user.id, ...validatedData });
  res.json({ message: "Item removido do carrinho!", item });
};

module.exports = { addToCart, getOwnCart, getCart, updateItem, removeItem };
