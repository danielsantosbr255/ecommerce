const service = require("./orders.service");
const { getRedis } = require("../../common/database/redis");
const CustomError = require("../../common/utils/CustomError");

const redis = getRedis();

class OrderController {
  constructor() {
    this.service = service;
  }

  create = async (req, res) => {
    const order = await this.service.create(req.userId);

    const cacheKey = `orders:${req.userId}`;
    await redis.set(cacheKey, JSON.stringify(order), { EX: 60 });
    res.json(order);
  };

  getAll = async (req, res) => {
    if (!req.ability.can("manage", "Order")) throw new CustomError("Acesso negado!", 403);

    const orders = await this.service.getAll(req.ability);
    res.json(orders);
  };

  getOne = async (req, res) => {
    const orders = await this.service.getOne(req.params.id, req.ability);
    res.json(orders);
  };

  getByUserId = async (req, res) => {
    const id = req.params.id === "me" ? req.userId : req.params.id;

    if (id !== req.userId && !req.ability.can("manage", "Order")) {
      throw new CustomError("Acesso negado!", 403);
    }

    const cacheKey = `orders:${id}`;
    const cache = await redis.get(cacheKey);

    if (cache) {
      console.log(`[Redis] Cache hit for ${cacheKey}`);
      return res.json(JSON.parse(cache));
    }

    const orders = await this.service.getByUserId(id, req.ability);
    await redis.set(cacheKey, JSON.stringify(orders), { EX: 60 });

    res.json(orders);
  };

  update = async (req, res) => {
    const order = await this.service.update(req.params.id, req.body, req.ability);
    res.json(order);
  };

  delete = async (req, res) => {
    await this.service.delete(req.params.id, req.ability);
    res.status(204).send();
  };
}

module.exports = new OrderController();
