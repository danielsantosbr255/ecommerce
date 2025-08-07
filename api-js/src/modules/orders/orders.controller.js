const service = require("./orders.service");

class OrderController {
  constructor() {
    this.service = service;
  }

  create = async (req, res) => {
    const cart = await service.create(req.user.id);
    res.json(cart);
  };

  getAll = async (req, res) => {
    const orders = await service.getAll(req.ability);
    res.json(orders);
  };

  getById = async (req, res) => {
    const orders = await service.getById(req.params.id, req.ability);
    res.json(orders);
  };

  update = async (req, res) => {
    const order = await service.update(req.params.id, req.body, req.ability);
    res.json(order);
  };

  delete = async (req, res) => {
    const order = await service.delete(req.params.id, req.ability);
    res.json(order);
  };
}

module.exports = new OrderController();
