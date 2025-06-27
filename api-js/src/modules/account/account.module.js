const express = require("express");
const controller = require("./account.controller");

const { verifyToken } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.get("/account", verifyToken, controller.getMyAccount);
router.put("/account", verifyToken, controller.updateMyAccount);
router.delete("/account", verifyToken, controller.deleteMyAccount);

module.exports = router;
