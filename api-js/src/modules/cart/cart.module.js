const router = require("express").Router();
const controller = require("./cart.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

router.get("/cart", verifyToken, controller.getCart);
router.post("/cart", verifyToken, controller.addToCart);
router.delete("/cart/:productId", verifyToken, controller.removeItem);

module.exports = router;
