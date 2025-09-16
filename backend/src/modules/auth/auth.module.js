const router = require("express").Router();
const controller = require("./auth.controller");
const { AuthGuard } = require("../../common/middlewares/auth.middleware");

router.post("/auth/sign-up", controller.signUp);
router.post("/auth/sign-in", controller.signIn);
router.post("/auth/sign-out", AuthGuard, controller.signOut);
router.post("/auth/refresh", controller.refreshToken);
router.get("/auth/csrf-token", controller.getCSRFToken);
// router.post("/auth/forgot-password", controller.forgotPassword);
// router.post("/auth/reset-password", controller.resetPassword);

module.exports = router;
