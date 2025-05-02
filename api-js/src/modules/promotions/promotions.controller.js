const service = require("./promotions.service");
const validator = require("../../common/validators/promotion.validator");

const createPromotion = async (req, res) => {
  if (!req.ability.can("manage", "Promotion")) throw new CustomError("Acesso negado!", 403);

  const validatedData = validator.create(req.body);
  const promotion = await service.createPromotion(validatedData);
  res.json(promotion);
};

const getPromotions = async (req, res) => {
  const promotions = await service.getPromotions();
  res.json(promotions);
};

const getPromotionBySlug = async (req, res) => {
  const promotion = await service.getPromotionBySlug(req.params.slug);
  res.json(promotion);
};

module.exports = { createPromotion, getPromotions, getPromotionBySlug };
