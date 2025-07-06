const service = require("./categories.service");
const validator = require("../../common/validators/category.validator");

const create = async (req, res) => {
  if (!req.ability.can("manage", "Category")) throw new CustomError("Acesso negado!", 403);

  const validatedData = validator.create(req.body);
  const category = await service.create(validatedData);
  res.json(category);
};

const getAll = async (req, res) => {
  const categories = await service.getAll();
  res.json(categories);
};

const getBySlug = async (req, res) => {
  const category = await service.getBySlug(req.params.slug);
  res.json(category);
};

module.exports = { create, getAll, getBySlug };
