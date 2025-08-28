const router = require("express").Router();
const controller = require("./orders.controller");
const { AuthGuard } = require("../../common/middlewares/auth.middleware");

router.post("/orders/checkout", AuthGuard, controller.create);
router.get("/orders", AuthGuard, controller.getAll);
router.get("/orders/:id", AuthGuard, controller.getOne);
router.put("/orders/:id", AuthGuard, controller.update);
router.delete("/orders/:id", AuthGuard, controller.delete);

router.get("/orders/user/:id", AuthGuard, controller.getByUserId);
// router.get("/orders/status/:status", controller.getByStatus);

module.exports = router;
