const router = require("express").Router();
const authMiddleware = require("../../common/middlewares/auth.middleware");

const controller = require("./products.controller");

router.get("products/", controller.getProducts);
router.get("products/:id", controller.getProductById);

router.post("products/", authMiddleware("ADMIN"), controller.createProduct);
router.put("products/:id", authMiddleware("ADMIN"), controller.updateProduct);
router.delete("products/:id", authMiddleware("ADMIN"), controller.deleteProduct);

module.exports = router;
