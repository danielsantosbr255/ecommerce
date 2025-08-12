const router = require("express").Router();
const { verifyToken } = require("../../common/middlewares/auth.middleware");
const upload = require("../../common/middlewares/multer.middleware");

const controller = require("./products.controller");

router.get("/products", controller.getAll);
router.get("/products/:slug", controller.getBySlug);
// router.get("/products/:id", controller.getById);
router.get("/products/:id/related", controller.getRelated);
router.post("/products", verifyToken, upload.array("images"), controller.create);
router.put("/products/:id", verifyToken, upload.array("images"), controller.update);
router.delete("/products/:id", verifyToken, controller.remove);

module.exports = router;
