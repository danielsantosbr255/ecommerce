const router = require("express").Router();
const controller = require("./cart.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

router.get("/cart", verifyToken, controller.getCart);
router.post("/cart", verifyToken, controller.addToCart);
router.put("/cart/:id", verifyToken, controller.updateItem);
router.delete("/cart/:id", verifyToken, controller.removeItem);

module.exports = router;
