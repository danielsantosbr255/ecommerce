const controller = require("./permissions.controller");
const { AuthGuard } = require("../../common/middlewares/auth.middleware");

const router = require("express").Router();

router.post("/permissions", AuthGuard, controller.create);
router.get("/permissions", AuthGuard, controller.getAll);
router.get("/permissions/:id", AuthGuard, controller.getOne);
router.put("/permissions/:id", AuthGuard, controller.update);
router.delete("/permissions/:id", AuthGuard, controller.remove);

module.exports = router;
