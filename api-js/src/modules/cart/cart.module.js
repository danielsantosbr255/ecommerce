const router = require("express").Router();
const controller = require("./cart.controller");
const authMiddleware = require("../../config/middlewares/auth.middleware");

router.use(authMiddleware());

router.get("/", controller.getCart);
router.post("/", controller.addToCart);
router.delete("/:productId", controller.removeItem);

module.exports = router;
