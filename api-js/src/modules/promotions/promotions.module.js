const express = require("express");
const controller = require("./promotions.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.post("/promotions", verifyToken, controller.create);
router.get("/promotions", controller.getAll);
router.get("/promotions/:slug", controller.getBySlug);
router.put("/promotions/:slug", verifyToken, controller.update);
router.delete("/promotions/:slug", verifyToken, controller.remove);

module.exports = router;
