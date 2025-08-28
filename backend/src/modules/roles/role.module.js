const controller = require("./role.controller");
const { AuthGuard } = require("../../common/middlewares/auth.middleware");

const router = require("express").Router();

router.post("/roles", AuthGuard, controller.create);
router.get("/roles", AuthGuard, controller.getAll);
router.get("/roles/:id", AuthGuard, controller.getOne);
router.put("/roles/:id", AuthGuard, controller.update);
router.delete("/roles/:id", AuthGuard, controller.remove);

module.exports = router;
