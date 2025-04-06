const router = require("express").Router();
const controller = require("./orders.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

router.get("/orders", verifyToken, controller.findAllOrders);
router.get("/orders/:id", verifyToken, controller.getOrdersByUserId);
router.post("/orders/checkout", verifyToken, controller.createOrder);

module.exports = router;
