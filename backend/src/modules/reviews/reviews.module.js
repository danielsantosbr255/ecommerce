const router = require("express").Router();
const { AuthGuard } = require("../../common/middlewares/auth.middleware");
const controller = require("./reviews.controller");

router.get("/reviews", AuthGuard, controller.getAll);
router.post("/reviews", AuthGuard, controller.create);
router.get("/reviews/:id", AuthGuard, controller.getById);
router.put("/reviews/:id", AuthGuard, controller.update);
router.delete("/reviews/:id", AuthGuard, controller.delete);
router.get("/reviews/product/:productId", controller.getByProductId);

module.exports = router;
