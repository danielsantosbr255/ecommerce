const express = require("express");
const controller = require("./brands.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.post("/brands", verifyToken, controller.create);
router.get("/brands/:slug", controller.getBySlug);
router.get("/brands", controller.getAll);

module.exports = router;
