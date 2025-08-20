const slugify = require("slugify");
const repository = require("./brands.repository");
const CustomError = require("../../common/utils/CustomError");
const validator = require("../../common/validators/brand.validator");

class BrandService {
  constructor() {
    this.repository = repository;
  }

  create = (data) => {
    if (data.name) data.slug = slugify(data.name, { lower: true });
    const validatedData = validator.create(data);
    return this.repository.create(validatedData);
  };

  getMany = (query) => {
    return this.repository.getMany(query);
  };

  getBySlug = (slug) => {
    return this.repository.getBySlug(slug);
  };

  update = async (slug, data) => {
    const brand = await this.repository.getBySlug(slug);
    if (!brand) throw new CustomError("Marca nao encontrada", 404);

    if (data.name) data.slug = slugify(data.name, { lower: true });
    const validatedData = validator.update(data);
    return this.repository.update(slug, validatedData);
  };

  remove = async (slug) => {
    const brand = await this.repository.getBySlug(slug);
    if (!brand) throw new CustomError("Marca nao encontrada", 404);
    return this.repository.remove(slug);
  };
}

module.exports = new BrandService();
