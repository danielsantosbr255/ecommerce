const service = require("./orders.service");
const CustomError = require("../../common/utils/CustomError");
const { defineAbilityFor } = require("../../common/utils/ability");
const { getRedis } = require("../../common/database/redis");

// const cache = {};

class OrderController {
  constructor() {
    this.service = service;
  }

  create = async (req, res) => {
    const cart = await this.service.create(req.userId);
    res.json(cart);
  };

  getAll = async (req, res) => {
    const ability = await defineAbilityFor(req.userId);
    if (!ability.can("manage", "Order")) throw new CustomError("Acesso negado!", 403);

    const orders = await this.service.getAll(ability);
    res.json(orders);
  };

  getOne = async (req, res) => {
    const orders = await this.service.getOne(req.params.id, req.ability);
    res.json(orders);
  };

  getByUserId = async (req, res) => {
    const id = req.params.id === "me" ? req.userId : req.params.id;

    if (id !== req.userId) {
      const ability = await defineAbilityFor(req.userId);
      if (!ability.can("manage", "Order")) throw new CustomError("Acesso negado!", 403);
    }

    const redis = getRedis();
    const cache = await redis.get("orders");

    if (cache) {
      console.log("cache hit");
      return res.json(JSON.parse(cache));
    }

    const orders = await this.service.getByUserId(id, req.ability);
    await redis.set("orders", JSON.stringify(orders), { EX: 60 });

    res.json(orders);
  };

  update = async (req, res) => {
    const order = await this.service.update(req.params.id, req.body, req.ability);
    res.json(order);
  };

  delete = async (req, res) => {
    const order = await this.service.delete(req.params.id, req.ability);
    res.json(order);
  };
}

module.exports = new OrderController();
