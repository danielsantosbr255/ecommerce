const router = require("express").Router();
const controller = require("./cart.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

router.post("/carts", verifyToken, controller.create);
router.get("/carts", verifyToken, controller.getMany);
router.get("/carts/:id", verifyToken, controller.getOne);
router.get("/carts/user/:id", verifyToken, controller.getByUserId);
router.put("/carts/:id", verifyToken, controller.update);
router.delete("/carts/:id", verifyToken, controller.removeItem);
router.delete("/carts", verifyToken, controller.removeCart);

module.exports = router;
