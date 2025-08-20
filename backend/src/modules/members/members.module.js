const controller = require("./members.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const router = require("express").Router();

router.post("/members", verifyToken, controller.create);
router.get("/members", verifyToken, controller.getAll);
router.get("/members/:userId/:roleId", verifyToken, controller.getOne);
router.put("/members/:userId/:roleId", verifyToken, controller.update);
router.delete("/members/:userId/:roleId", verifyToken, controller.remove);

module.exports = router;
