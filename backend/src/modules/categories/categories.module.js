const express = require("express");
const controller = require("./categories.controller");
const { AuthGuard } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.post("/categories", AuthGuard, controller.create);
router.get("/categories/:slug", controller.getBySlug);
router.get("/categories", controller.getAll);
router.put("/categories/:slug", AuthGuard, controller.update);
router.delete("/categories/:slug", AuthGuard, controller.remove);

module.exports = router;
