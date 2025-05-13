const service = require("./orders.service");

const createOrder = async (req, res) => {
  const cart = await service.createOrder(req.user.id);
  res.json(cart);
};

const getOrdersByUserId = async (req, res) => {
  const orders = await service.getOrdersByUserId(req);
  res.json(orders);
};

const findAllOrders = async (req, res) => {
  const orders = await service.findAllOrders(req);
  res.json(orders);
};

module.exports = { createOrder, getOrdersByUserId, findAllOrders };
