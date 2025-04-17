const router = require("express").Router();
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const controller = require("./products.controller");
const multer = require("../../common/utils/multer.util");

router.get("/products", controller.getProducts);
router.get("/products/:slug", controller.getProductBySlug);
router.get("/products/brand/:brand", controller.getProductsByBrand);
router.get("/products/search/:query", controller.getProductsByQuery);
router.get("/products/category/:slug", controller.getProductsByCategory);

router.delete("/products/:id", verifyToken, controller.deleteProduct);
router.post("/products", verifyToken, multer.single("image"), controller.createProduct);
router.put("/products/:id", verifyToken, multer.single("image"), controller.updateProduct);

module.exports = router;
