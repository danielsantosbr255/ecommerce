const controller = require("./permissions.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const router = require("express").Router();

router.post("/permissions", verifyToken, controller.create);
router.get("/permissions", verifyToken, controller.getAll);
router.get("/permissions/:id", verifyToken, controller.getOne);
router.put("/permissions/:id", verifyToken, controller.update);
router.delete("/permissions/:id", verifyToken, controller.remove);

module.exports = router;
