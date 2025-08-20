const repository = require("./products.repository");
const { prisma } = require("../../common/database/prisma");
const CustomError = require("../../common/utils/CustomError");
const { getPagination, buildMeta } = require("../../common/utils/pagination.util");
const { uploadToCloudinary, deleteImage } = require("../../common/utils/cloudinary.util");

class ProductService {
  constructor() {
    this.repository = repository;
  }

  create = async (data) => {
    const existingProduct = await this.repository.getBySlug(data.slug);
    if (existingProduct) throw new CustomError("Já existe um produto com este slug", 422);

    const uploadResults = await Promise.all(
      data.images?.map((image) =>
        uploadToCloudinary(image.buffer, {
          folder: "ecommerce/products",
          transformation: [{ width: 800, height: 800, crop: "limit" }, { quality: "auto" }],
        })
      )
    );

    data.images = uploadResults.map((img, index) => ({
      url: img.secure_url,
      publicId: img.public_id,
      order: index,
      alt: `${data.title} image ${index + 1}`,
    }));

    return this.repository.create(data);
  };

  getMany = async (query) => {
    const { page, limit, skip } = getPagination(query);

    const where = {
      AND: [
        query.search
          ? {
              OR: [
                { title: { contains: query.search, mode: "insensitive" } },
                { slug: { contains: query.search, mode: "insensitive" } },
                { description: { contains: query.search, mode: "insensitive" } },
                { brand: { name: { contains: query.search, mode: "insensitive" } } },
                { category: { name: { contains: query.search, mode: "insensitive" } } },
                { specifications: { some: { value: { contains: query.search, mode: "insensitive" } } } },
              ],
            }
          : {},
        query.categoryId ? { categoryId: query.categoryId } : {},
        query.brandId ? { brandId: query.brandId } : {},
      ],
    };

    const orderBy = (() => {
      switch (query.orderBy) {
        case "price":
          return { price: query.order === "asc" ? "asc" : "desc" };
        case "sold":
          return { salesCount: query.order === "asc" ? "asc" : "desc" };
        case "rating":
          return { rating: query.order === "asc" ? "asc" : "desc" };
        case "views":
          return { viewsCount: query.order === "asc" ? "asc" : "desc" };
        case "title":
          return { title: query.order === "asc" ? "asc" : "desc" };
        default:
          return { createdAt: "desc" };
      }
    })();

    const [data, total] = await Promise.all([
      this.repository.getMany({ where, skip, take: limit, orderBy }),
      this.repository.getCount(where),
    ]);

    return {
      data,
      meta: buildMeta(total, page, limit),
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
    const products = await this.repository.getRelated(product);

    const pagination = getPagination({ page: 1, limit: 10 });

    return {
      data: products,
      meta: buildMeta(products.length, pagination.page, pagination.limit),
    };
  };

  getCount = async (where) => {
    return await this.repository.getCount(where);
  };

  update = async (id, data) => {
    const product = await this.repository.getById(id);
    if (!product) throw new CustomError("Produto não encontrado!", 404);

    const existingProductSlug = await this.repository.getBySlug(data.slug);
    if (existingProductSlug && existingProductSlug.id !== id) throw new CustomError("Já existe um produto com este slug", 422);

    const imagesToDelete = product.images.filter((img) => !data.keptImages.some((keptImg) => keptImg.publicId === img.publicId));

    if (imagesToDelete.length > 0) {
      await Promise.all(imagesToDelete.map((img) => deleteImage(img.publicId)));
      await prisma.productImage.deleteMany({
        where: { id: { in: imagesToDelete.map((img) => img.id) } },
      });
    }

    let uploadResults = [];

    if (data.images) {
      uploadResults = await Promise.all(
        data.images.map((image) =>
          uploadToCloudinary(image.buffer, {
            folder: "ecommerce/products",
            transformation: [{ width: 800, height: 800, crop: "limit" }, { quality: "auto" }],
          })
        )
      );
    }

    data.images = uploadResults.map((img, index) => ({
      url: img.secure_url,
      publicId: img.public_id,
      order: data.keptImages?.length + index,
      alt: `${product.title} image ${data.keptImages?.length + index + 1}`,
    }));

    return this.repository.update(id, data);
  };

  remove = async (id) => {
    const product = await this.repository.getById(id);
    if (!product) throw new CustomError("Produto não encontrado!", 404);

    await Promise.all(product.images.map((img) => deleteImage(img.publicId)));

    return this.repository.remove(id);
  };
}

module.exports = new ProductService();
