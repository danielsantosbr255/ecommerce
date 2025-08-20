const router = require("express").Router();
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const controller = require("./uploads.controller");

router.post("/uploads", verifyToken, controller.uploadImage);

module.exports = router;
