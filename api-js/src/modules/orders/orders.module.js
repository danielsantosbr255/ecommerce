const router = require("express").Router();
const controller = require("./orders.controller");
const authMiddleware = require("../../config/middlewares/auth.middleware");

router.use(authMiddleware()); // Only authenticated users can access these routes

router.get("/", controller.getOrdersByUserId);
router.post("/checkout", controller.createOrder);

module.exports = router;
