const router = require("express").Router();
const { verifyToken } = require("../../common/middlewares/auth.middleware");
const controller = require("./reviews.controller");

router.post("/reviews", verifyToken, controller.createReview);
router.get("/reviews/product/:slug", controller.getReviews);
router.put("/reviews/:id", verifyToken, controller.updateReview);
router.delete("/reviews/:id", verifyToken, controller.deleteReview);

module.exports = router;
