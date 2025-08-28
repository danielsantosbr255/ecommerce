const router = require("express").Router();
const controller = require("./session.controller");
const { AuthGuard } = require("../../common/middlewares/auth.middleware");

router.get("/sessions", AuthGuard, controller.getAll);
router.get("/sessions/:id", AuthGuard, controller.getOne);
router.put("/sessions/:id", AuthGuard, controller.update);
router.delete("/sessions/:id", AuthGuard, controller.remove);
router.get("/sessions/user/:id", AuthGuard, controller.getByUserId);

module.exports = router;
