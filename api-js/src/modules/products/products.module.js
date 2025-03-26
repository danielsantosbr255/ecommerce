const router = require("express").Router();
const authMiddleware = require("../../config/middlewares/auth.middleware");

const controller = require("./products.controller");

router.get("/", controller.getProducts);
router.get("/:id", controller.getProductById);

router.use(authMiddleware("ADMIN"));
router.post("/", controller.createProduct);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
