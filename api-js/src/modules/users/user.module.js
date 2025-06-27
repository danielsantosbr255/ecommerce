const express = require("express");
const controller = require("./user.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.get("/account", verifyToken, controller.getMyAccount);
router.put("/account", verifyToken, controller.updateMyAccount);
router.delete("/account", verifyToken, controller.deleteMyAccount);

router.get("/users", verifyToken, controller.getUsers);
router.get("/users/:id", verifyToken, controller.getUserById);
router.put("/users/:id", verifyToken, controller.updateUser);
router.delete("/users/:id", verifyToken, controller.deleteUser);

module.exports = router;
