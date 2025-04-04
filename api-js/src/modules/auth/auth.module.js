const router = require("express").Router();
const controller = require("./auth.controller");

router.post("/auth/signup", controller.signUp);
router.post("/auth/signin", controller.signIn);
router.post("/auth/logout", controller.logout);
router.post("/auth/refresh", controller.refreshToken);

module.exports = router;
