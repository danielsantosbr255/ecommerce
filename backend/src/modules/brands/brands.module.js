const express = require("express");
const controller = require("./brands.controller");
const { AuthGuard } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.post("/brands", AuthGuard, controller.create);
router.get("/brands", controller.getMany);
router.get("/brands/:slug", controller.getBySlug);
router.put("/brands/:slug", AuthGuard, controller.update);
router.delete("/brands/:slug", AuthGuard, controller.remove);

module.exports = router;
