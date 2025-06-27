const router = require("express").Router();
const controller = require("./session.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

router.get("/sessions", verifyToken, controller.getAll);
router.get("/sessions/:id", verifyToken, controller.getById);
router.put("/sessions/:id", verifyToken, controller.update);
router.delete("/sessions/:id", verifyToken, controller.remove);

module.exports = router;
