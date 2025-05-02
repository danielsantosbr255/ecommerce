const service = require("./categories.service");
const validator = require("../../common/validators/category.validator");

const createCategory = async (req, res) => {
  if (!req.ability.can("manage", "Category")) throw new CustomError("Acesso negado!", 403);

  const validatedData = validator.create(req.body);
  const category = await service.createCategory(validatedData);
  res.json(category);
};

const getCategories = async (req, res) => {
  const categories = await service.getCategories();
  res.json(categories);
};

const getCategoryBySlug = async (req, res) => {
  const category = await service.getCategoryBySlug(req.params.slug);
  res.json(category);
};

module.exports = { createCategory, getCategories, getCategoryBySlug };
