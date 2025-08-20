const express = require("express");
const controller = require("./brands.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.post("/brands", verifyToken, controller.create);
router.get("/brands", controller.getMany);
router.get("/brands/:slug", controller.getBySlug);
router.put("/brands/:slug", verifyToken, controller.update);
router.delete("/brands/:slug", verifyToken, controller.remove);

module.exports = router;
