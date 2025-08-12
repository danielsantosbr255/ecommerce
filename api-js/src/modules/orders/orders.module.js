const router = require("express").Router();
const controller = require("./orders.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

router.post("/orders/checkout", verifyToken, controller.create);
router.get("/orders", verifyToken, controller.getAll);
router.get("/orders/:id", verifyToken, controller.getOne);
router.put("/orders/:id", verifyToken, controller.update);
router.delete("/orders/:id", verifyToken, controller.delete);

router.get("/orders/user/:id", verifyToken, controller.getByUserId);
// router.get("/orders/status/:status", controller.getByStatus);

module.exports = router;
