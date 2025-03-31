const express = require("express");
const authMiddleware = require("../../common/middlewares/auth.middleware");
const controller = require("./user.controller");

const router = express.Router();

router.use(authMiddleware());
router.get("/account", authMiddleware(), controller.getMyProfile);
router.put("/account", authMiddleware(), controller.updateMyProfile);
router.delete("/account", authMiddleware(), controller.deleteMyAccount);

router.use(authMiddleware("ADMIN"));
router.get("/users", controller.getUsers);
router.get("/users/:id", controller.getUserById);
router.put("/users/:id", controller.updateUser);
router.delete("/users/:id", controller.deleteUser);

module.exports = router;
