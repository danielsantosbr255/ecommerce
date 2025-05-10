const router = require("express").Router();
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const controller = require("./products.controller");
const multer = require("../../common/middlewares/multer.middleware");

router.get("/products", controller.getProducts);
router.get("/products/:slug", controller.getProductBySlug);
router.get("/products/brand/:brand", controller.getProductsByBrand);
router.get("/products/search/:query", controller.getProductsByQuery);
router.get("/products/:productId/related", controller.getProductsByCategory);

router.delete("/products/:id", verifyToken, controller.deleteProduct);
router.post("/products", verifyToken, multer.array("images", 5), controller.createProduct);
router.put("/products/:id", verifyToken, multer.array("images", 5), controller.updateProduct);

module.exports = router;
