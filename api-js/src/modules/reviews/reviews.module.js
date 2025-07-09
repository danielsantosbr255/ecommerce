const router = require("express").Router();
const { verifyToken } = require("../../common/middlewares/auth.middleware");
const controller = require("./reviews.controller");

router.get("/reviews", verifyToken, controller.getAll);
router.post("/reviews", verifyToken, controller.create);
router.get("/reviews/:id", verifyToken, controller.getById);
router.put("/reviews/:id", verifyToken, controller.update);
router.delete("/reviews/:id", verifyToken, controller.delete);

module.exports = router;
