const service = require("./cart.service");
const validator = require("../../common/validators/cart.validator");

const addToCart = async (req, res) => {
  const validatedData = validator.create(req.body);
  const { productId, quantity } = validatedData;
  const cart = await service.addItem(req.user.id, productId, quantity);
  res.json(cart);
};

const getCart = async (req, res) => {
  const cart = await service.getCart(req.user.id);
  res.json(cart);
};

const updateItem = async (req, res) => {
  const validatedData = validator.update(req.body);
  const { id } = req.params;
  const { quantity } = validatedData;
  const item = await service.updateItem(id, quantity);
  res.json(item);
};

const removeItem = async (req, res) => {
  const validatedData = validator.delete({ productId: req.params.productId });
  const item = await service.removeItem(req.user.id, validatedData);
  res.json({ message: "Item removido do carrinho!", item });
};

module.exports = { addToCart, updateItem, removeItem, getCart };
