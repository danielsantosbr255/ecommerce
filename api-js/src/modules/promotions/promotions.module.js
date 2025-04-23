const express = require("express");
const controller = require("./promotions.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.post("/promotions", verifyToken, controller.createPromotion);
router.get("/promotions/:id", controller.getPromotionById);
router.get("/promotions", controller.getPromotions);

module.exports = router;
