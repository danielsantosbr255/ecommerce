const router = require("express").Router();
const { AuthGuard } = require("../../common/middlewares/auth.middleware");

const controller = require("./uploads.controller");

router.post("/uploads", AuthGuard, controller.uploadImage);

module.exports = router;
