const express = require("express");
const controller = require("./promotions.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.get("/promotions", controller.getPromotions);
router.get("/promotions/:slug", controller.getPromotionBySlug);
router.post("/promotions", verifyToken, controller.createPromotion);

module.exports = router;
