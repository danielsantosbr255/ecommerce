const slugify = require("slugify");
const repository = require("./categories.repository");
const validator = require("../../common/validators/category.validator");
const CustomError = require("../../common/utils/CustomError");

class CategoryService {
  constructor() {
    this.repository = repository;
  }

  create = async (data) => {
    const { name, image } = data;
    const slug = slugify(name, { lower: true });
    const validatedData = validator.create({ name, slug, image });
    return await this.repository.create(validatedData);
  };

  getAll = () => {
    return this.repository.getAll();
  };

  getBySlug = (slug) => {
    return this.repository.getBySlug(slug);
  };

  update = async (slug, data) => {
    const category = await this.repository.getBySlug(slug);
    if (!category) throw new CustomError("Categoria nao encontrada", 404);

    if (data.name) data.slug = slugify(data.name, { lower: true });
    const validatedData = validator.update(data);
    return await this.repository.update(slug, validatedData);
  };

  remove = async (slug) => {
    const category = await this.repository.getBySlug(slug);
    if (!category) throw new CustomError("Categoria nao encontrada", 404);
    return await this.repository.remove(slug);
  };
}

module.exports = new CategoryService();
