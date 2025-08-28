const express = require("express");
const controller = require("./promotions.controller");
const { AuthGuard } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.post("/promotions", AuthGuard, controller.create);
router.get("/promotions", controller.getAll);
router.get("/promotions/:slug", controller.getBySlug);
router.put("/promotions/:slug", AuthGuard, controller.update);
router.delete("/promotions/:slug", AuthGuard, controller.remove);

module.exports = router;
