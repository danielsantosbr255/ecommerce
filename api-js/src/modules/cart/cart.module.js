const router = require("express").Router();
const controller = require("./cart.controller");
const authMiddleware = require("../../common/middlewares/auth.middleware");

router.get("cart/", authMiddleware(), controller.getCart);
router.post("cart/", authMiddleware(), controller.addToCart);
router.delete("cart/:productId", authMiddleware(), controller.removeItem);

module.exports = router;
