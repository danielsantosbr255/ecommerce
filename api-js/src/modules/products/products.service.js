const repository = require("./products.repository");
const CustomError = require("../../common/utils/CustomError");
const { uploadToCloudinary } = require("../../common/utils/cloudinary.util");

class ProductService {
  constructor() {
    this.repository = repository;
  }

  create = async (data) => {
    const existingProduct = await this.repository.getBySlug(data.slug);
    if (existingProduct) throw new CustomError("Já existe um produto com este slug");

    const uploadResults = await Promise.all(
      data.images.map((image) =>
        uploadToCloudinary(image.buffer, {
          folder: "ecommerce/products",
          transformation: [{ width: 800, height: 800, crop: "limit" }, { quality: "auto" }],
        })
      )
    );

    return this.repository.create({ data, uploadResults });
  };

  getAll = async (query) => {
    const { q, categoryId, brandId, minPrice, maxPrice, page = 1, pageSize = 20 } = query;

    const take = parseInt(pageSize);
    const skip = (parseInt(page) - 1) * take;

    const where = { isActive: true, deletedAt: null };

    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { category: { name: { contains: q, mode: "insensitive" } } },
        { brand: { name: { contains: q, mode: "insensitive" } } },
      ];
    }

    if (categoryId) where.categoryId = categoryId;
    if (brandId) where.brandId = brandId;

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    const products = await this.repository.getAll(where, take, skip);

    return {
      products,
      pagination: {
        totalItems: products.length,
        currentPage: parseInt(page),
        pageSize: take,
        totalPages: Math.ceil(products.length / take),
      },
    };
  };

  getById = async (id) => {
    return await this.repository.getById(id);
  };

  getBySlug = async (slug) => {
    return await this.repository.getBySlug(slug);
  };

  getRelated = async (productId) => {
    const product = await this.repository.getById(productId);
    const products = await this.repository.getRelated(productId, product.categoryId, product.brandId);

    const page = 1;
    const take = 10;

    return {
      products,
      pagination: {
        totalItems: products.length,
        currentPage: parseInt(page),
        pageSize: take,
        totalPages: Math.ceil(products.length / take),
      },
    };
  };

  update = async (id, data) => {
    const product = await this.repository.getById(id);
    if (!product) throw new CustomError("Produto não encontrado!", 404);

    return this.repository.update(id, data);
  };

  remove = async (id) => {
    const product = await this.repository.getById(id);
    if (!product) throw new CustomError("Produto não encontrado!", 404);

    return this.repository.remove(id);
  };
}

module.exports = new ProductService();
