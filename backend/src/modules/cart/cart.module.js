const router = require("express").Router();
const controller = require("./cart.controller");
const { AuthGuard } = require("../../common/middlewares/auth.middleware");

router.post("/carts", AuthGuard, controller.create);
router.get("/carts", AuthGuard, controller.getMany);
router.get("/carts/:id", AuthGuard, controller.getOne);
router.get("/carts/user/:id", AuthGuard, controller.getByUserId);
router.put("/carts/:id", AuthGuard, controller.update);
router.delete("/carts/:id", AuthGuard, controller.removeItem);
router.delete("/carts", AuthGuard, controller.removeCart);

module.exports = router;
