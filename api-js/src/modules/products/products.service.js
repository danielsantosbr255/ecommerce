const slugify = require("slugify");
const repository = require("./products.repository");
const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/product.validator");
const { uploadToCloudinary, deleteImage } = require("../../common/utils/cloudinary.util");

const formatData = (data) => {
  if (data.title) data.slug = slugify(data.title, { lower: true });
  if (data.price) data.price = parseInt(data.price);
  if (data.stock) data.stock = parseInt(data.stock);
  if (data.rating) data.rating = parseInt(data.rating);
  if (data.discount) data.discount = parseInt(data.discount);
  if (data.isActive) data.isActive = Boolean(data.isActive);
  if (data.keptImages) data.keptImages = JSON.parse(data.keptImages || "[]");
  else data.keptImages = [];

  if (data.specifications) {
    if (!data.specifications.length) delete data.specifications;
    else data.specifications = JSON.parse(data.specifications || "[]");
  }
  return data;
};

class ProductService {
  constructor() {
    this.repository = repository;
  }

  create = async (data) => {
    data = formatData(data);
    const existingProduct = await this.repository.getBySlug(data.slug);
    if (existingProduct) throw new CustomError("Já existe um produto com este slug", 422);

    const validatedData = validator.create(data);

    const uploadResults = await Promise.all(
      validatedData.images?.map((image) =>
        uploadToCloudinary(image.buffer, {
          folder: "ecommerce/products",
          transformation: [{ width: 800, height: 800, crop: "limit" }, { quality: "auto" }],
        })
      )
    );

    validatedData.images = uploadResults.map((img, index) => ({
      url: img.secure_url,
      publicId: img.public_id,
      order: index,
      alt: `${validatedData.title} image ${index + 1}`,
    }));

    return this.repository.create(validatedData);
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

    const totalItems = await this.repository.getCount(where);
    const products = await this.repository.getAll(where, take, skip);

    return {
      products,
      pagination: {
        totalItems,
        currentPage: parseInt(page),
        pageSize: take,
        totalPages: Math.ceil(totalItems / take),
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

  getCount = async (where) => {
    return await this.repository.getCount(where);
  };

  update = async (id, data) => {
    const formatedData = formatData(data);

    const product = await this.repository.getById(id);
    if (!product) throw new CustomError("Produto não encontrado!", 404);

    const existingProductSlug = await this.repository.getBySlug(formatedData.slug);
    if (existingProductSlug && existingProductSlug.id !== id) throw new CustomError("Já existe um produto com este slug", 422);

    const validatedData = validator.update(formatedData);

    const imagesToDelete = product.images.filter(
      (img) => !validatedData.keptImages.some((keptImg) => keptImg.publicId === img.publicId)
    );

    if (imagesToDelete.length > 0) {
      await Promise.all(imagesToDelete.map((img) => deleteImage(img.publicId)));
      await prisma.productImage.deleteMany({
        where: { id: { in: imagesToDelete.map((img) => img.id) } },
      });
    }

    let uploadResults = [];
    if (validatedData.images) {
      uploadResults = await Promise.all(
        validatedData.images.map((image) =>
          uploadToCloudinary(image.buffer, {
            folder: "ecommerce/products",
            transformation: [{ width: 800, height: 800, crop: "limit" }, { quality: "auto" }],
          })
        )
      );
    }

    validatedData.images = uploadResults.map((img, index) => ({
      url: img.secure_url,
      publicId: img.public_id,
      order: validatedData.keptImages?.length + index,
      alt: `${product.title} image ${validatedData.keptImages?.length + index + 1}`,
    }));

    return this.repository.update(id, validatedData);
  };

  remove = async (id) => {
    const product = await this.repository.getById(id);
    if (!product) throw new CustomError("Produto não encontrado!", 404);

    await Promise.all(product.images.map((img) => deleteImage(img.publicId)));

    return this.repository.remove(id);
  };
}

module.exports = new ProductService();
