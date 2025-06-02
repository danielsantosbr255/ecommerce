const router = require("express").Router();
const controller = require("./cart.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

router.get("/carts", verifyToken, controller.getCart);
router.get("/cart", verifyToken, controller.getOwnCart);
router.post("/carts", verifyToken, controller.addToCart);
router.put("/carts/:id", verifyToken, controller.updateItem);
router.delete("/carts/:id", verifyToken, controller.removeItem);
router.delete("/carts", verifyToken, controller.removeCart);

module.exports = router;
