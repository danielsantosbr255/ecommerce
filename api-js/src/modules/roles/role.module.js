const controller = require("./role.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const router = require("express").Router();

router.post("/roles", verifyToken, controller.create);
router.get("/roles", verifyToken, controller.getAll);
router.get("/roles/:id", verifyToken, controller.getById);
router.put("/roles/:id", verifyToken, controller.update);
router.delete("/roles/:id", verifyToken, controller.remove);

module.exports = router;
