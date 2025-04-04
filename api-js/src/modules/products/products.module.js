const router = require("express").Router();
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const controller = require("./products.controller");
const multer = require("../../common/utils/multer");

router.get("/products", controller.getProducts);
router.get("/products/:id", controller.getProductById);
router.post("/products", verifyToken, multer.single("image"), controller.createProduct);
router.put("/products/:id", verifyToken, multer.single("image"), controller.updateProduct);
router.delete("/products/:id", verifyToken, controller.deleteProduct);

module.exports = router;
