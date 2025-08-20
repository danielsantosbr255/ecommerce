const router = require("express").Router();
const controller = require("./session.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

router.get("/sessions", verifyToken, controller.getAll);
router.get("/sessions/:id", verifyToken, controller.getOne);
router.put("/sessions/:id", verifyToken, controller.update);
router.delete("/sessions/:id", verifyToken, controller.remove);
router.get("/sessions/user/:id", verifyToken, controller.getByUserId);

module.exports = router;
