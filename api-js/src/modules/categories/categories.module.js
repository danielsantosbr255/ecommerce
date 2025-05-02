const express = require("express");
const controller = require("./categories.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.get("/categories", controller.getCategories);
router.get("/categories/:slug", controller.getCategoryBySlug);
router.post("/categories", verifyToken, controller.createCategory);

module.exports = router;
