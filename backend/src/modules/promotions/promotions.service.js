const repository = require("./promotions.repository");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/promotion.validator");

class PromotionService {
  constructor() {
    this.repository = repository;
  }

  async create(data) {
    if (data.startsAt) data.startsAt = new Date(startsAt);
    if (data.endsAt) data.endsAt = new Date(endsAt);

    const validatedData = validator.create(data);
    return await this.repository.create(validatedData);
  }

  async getAll() {
    return this.repository.getAll();
  }

  async getBySlug(slug) {
    return this.repository.getBySlug(slug);
  }

  async update(id, data) {
    const promotion = await this.repository.getById(id);
    if (!promotion) throw new CustomError("Promocao nao encontrada", 404);

    if (data.startsAt) data.startsAt = new Date(startsAt);
    if (data.endsAt) data.endsAt = new Date(endsAt);

    const validatedData = validator.update(data);
    return await this.repository.update(id, validatedData);
  }

  async remove(id) {
    const promotion = await this.repository.getById(id);
    if (!promotion) throw new CustomError("Promocao nao encontrada", 404);
    return this.repository.remove(id);
  }
}

module.exports = new PromotionService();
