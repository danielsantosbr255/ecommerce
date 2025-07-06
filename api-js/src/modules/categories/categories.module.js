const express = require("express");
const controller = require("./categories.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.post("/categories", verifyToken, controller.create);
router.get("/categories/:slug", controller.getBySlug);
router.get("/categories", controller.getAll);

module.exports = router;
