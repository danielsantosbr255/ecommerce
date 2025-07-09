const repository = require("./reviews.repository");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/review.validator");
const productRepository = require("../products/products.repository");

class ReviewService {
  constructor() {
    this.repository = repository;
  }

  create = async (data) => {
    const validatedData = validator.create(data);

    const product = await productRepository.getBySlug(validatedData.productSlug);
    if (!product) throw new CustomError("Produto não encontrado!", 404);

    return this.repository.create(validatedData);
  };

  getAll = () => {
    return this.repository.getAll();
  };

  getById = (id) => {
    return this.repository.getById(id);
  };

  update = async (id, data) => {
    const review = this.repository.getById(id);
    if (!review) throw new CustomError("Produto não encontrado!", 404);

    const validatedData = validator.update(data);
    return this.repository.update(id, validatedData);
  };

  delete = async (id) => {
    const review = await this.repository.getById(id);
    if (!review) throw new CustomError("Produto não encontrado!", 404);
    return this.repository.delete(id);
  };
}

module.exports = new ReviewService();
