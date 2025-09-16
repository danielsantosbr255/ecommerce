const router = require("express").Router();
const controller = require("./payments.controller");
const { AuthGuard } = require("../../common/middlewares/auth.middleware");

router.post("/payments/create", AuthGuard, controller.create);
router.post("/payments/capture", AuthGuard, controller.capture);

module.exports = router;
