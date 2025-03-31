const router = require("express").Router();
const controller = require("./orders.controller");
const authMiddleware = require("../../common/middlewares/auth.middleware");

router.get("orders/", authMiddleware(), controller.getOrdersByUserId);
router.post("orders/checkout", authMiddleware(), controller.createOrder);

module.exports = router;
