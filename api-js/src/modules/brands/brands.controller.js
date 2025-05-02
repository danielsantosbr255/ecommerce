const service = require("./brands.service");
const validator = require("../../common/validators/brand.validator");

const createBrand = async (req, res) => {
  if (!req.ability.can("manage", "Brand")) throw new CustomError("Acesso negado!", 403);

  const validatedData = validator.create(req.body);
  const brand = await service.createBrand(validatedData);
  res.json(brand);
};

const getBrands = async (req, res) => {
  const brands = await service.getBrands();
  res.json(brands);
};

const getBrandBySlug = async (req, res) => {
  const brand = await service.getBrandBySlug(req.params.slug);
  res.json(brand);
};

module.exports = { createBrand, getBrands, getBrandBySlug };
