const router = require("express").Router();
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const controller = require("./products.controller");
const multer = require("../../common/middlewares/multer.middleware");

router.get("/products", controller.getAll);
router.get("/products/:slug", controller.getBySlug);
router.get("/products/brand/:brand", controller.getByBrand);
router.get("/products/search/:query", controller.getByQuery);
router.get("/products/:productId/related", controller.getByCategory);

router.delete("/products/:id", verifyToken, controller.remove);
router.post("/products", verifyToken, multer.array("images", 5), controller.create);
router.put("/products/:id", verifyToken, multer.array("images", 5), controller.update);

module.exports = router;
