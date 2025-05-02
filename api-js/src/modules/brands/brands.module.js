const express = require("express");
const controller = require("./brands.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.get("/brands", controller.getBrands);
router.get("/brands/:slug", controller.getBrandBySlug);
router.post("/brands", verifyToken, controller.createBrand);

module.exports = router;
