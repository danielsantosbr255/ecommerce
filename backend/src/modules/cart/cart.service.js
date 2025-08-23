const repository = require("./cart.repository");
const productRepository = require("../products/products.repository");
const { getPagination } = require("../../common/utils/pagination.util");

class BrandService {
  constructor() {
    this.repository = repository;
  }

  async create(data) {
    const { userId, productId, quantity } = data;

    const product = await productRepository.getById(productId);

    if (!product) throw new CustomError("Produto não encontrado.", 404);
    if (product.stock < quantity) throw new CustomError("Quantidade em estoque insuficiente.", 400);

    const existingCart = await this.getByUserId(userId);

    if (!existingCart) {
      return await this.repository.create(userId, { productId, quantity });
    }

    return await this.repository.update(existingCart.id, { productId, quantity });
  }

  getMany(query) {
    return this.repository.getMany(query);
  }

  getOne(id) {
    return this.repository.getOne(id);
  }

  getByUserId(userId) {
    return this.repository.getByUserId(userId);
  }

  update(id, data) {
    return this.repository.update(id, data);
  }

  delete(id) {
    return this.repository.delete(id);
  }
}

module.exports = new BrandService();
