const router = require("express").Router();
const { AuthGuard } = require("../../common/middlewares/auth.middleware");
const upload = require("../../common/middlewares/multer.middleware");

const controller = require("./products.controller");

router.get("/products", controller.getMany);
router.get("/products/:slug", controller.getBySlug);
router.get("/products/:id/related", controller.getRelated);
router.post("/products", AuthGuard, upload.array("images"), controller.create);
router.put("/products/:id", AuthGuard, upload.array("images"), controller.update);
router.delete("/products/:id", AuthGuard, controller.remove);

module.exports = router;
