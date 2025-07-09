const router = require("express").Router();
const controller = require("./orders.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

router.post("/orders/checkout", verifyToken, controller.create);
router.get("/orders", verifyToken, controller.getAll);
router.get("/orders/:id", verifyToken, controller.getById);
router.put("/orders/:id", verifyToken, controller.update);
router.delete("/orders/:id", verifyToken, controller.delete);

module.exports = router;
