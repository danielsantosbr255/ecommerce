const service = require("./reviews.service");
const CustomError = require("../../common/utils/CustomError");

class ReviewController {
  constructor() {
    this.service = service;
  }

  create = async (req, res) => {    
    if (req.userId) req.body.userId = req.userId;

    const review = await this.service.create(req.body);
    res.status(201).json(review);
  };

  getAll = async (req, res) => {
    if (!req.ability.can("manage", "Review")) throw new CustomError("Acesso negado!", 403);

    const reviews = await this.service.getAll();
    res.json(reviews);
  };

  getByProductId = async (req, res) => {
    const reviews = await this.service.getByProductId(req.params.productId);
    res.json(reviews);
  };

  getById = async (req, res) => {
    const review = await this.service.getById(req.params.id);
    res.json(review);
  };

  update = async (req, res) => {
    const review = await this.service.update(req.params.id, req.body);
    res.json(review);
  };

  delete = async (req, res) => {
    const review = await this.service.delete(req.params.id);
    res.json(review);
  };
}

module.exports = new ReviewController();
