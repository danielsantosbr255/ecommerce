const router = require("express").Router();
const controller = require("./auth.controller");

router.post("/auth/signup", controller.signUp);
router.post("/auth/signin", controller.signIn);

module.exports = router;
