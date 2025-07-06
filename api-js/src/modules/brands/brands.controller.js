const service = require("./brands.service");
const validator = require("../../common/validators/brand.validator");

const create = async (req, res) => {
  if (!req.ability.can("manage", "Brand")) throw new CustomError("Acesso negado!", 403);

  const validatedData = validator.create(req.body);
  const brand = await service.create(validatedData);
  res.json(brand);
};

const getAll = async (req, res) => {
  const brands = await service.getAll();
  res.json(brands);
};

const getBySlug = async (req, res) => {
  const brand = await service.getBySlug(req.params.slug);
  res.json(brand);
};

module.exports = { create, getAll, getBySlug };
