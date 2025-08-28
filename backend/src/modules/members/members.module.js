const controller = require("./members.controller");
const { AuthGuard } = require("../../common/middlewares/auth.middleware");

const router = require("express").Router();

router.post("/members", AuthGuard, controller.create);
router.get("/members", AuthGuard, controller.getAll);
router.get("/members/:userId/:roleId", AuthGuard, controller.getOne);
router.put("/members/:userId/:roleId", AuthGuard, controller.update);
router.delete("/members/:userId/:roleId", AuthGuard, controller.remove);

module.exports = router;
