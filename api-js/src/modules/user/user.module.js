const express = require("express");
const authMiddleware = require("../../config/middlewares/auth.middleware");
const controller = require("./user.controller");

const router = express.Router();

router.get("/account", controller.getMyProfile);
router.put("/account", controller.updateMyProfile);
router.delete("/account", controller.deleteMyAccount);

router.use(authMiddleware("ADMIN"));
router.get("/users", controller.getUsers);
router.get("/users/:id", controller.getUserById);
router.put("/users/:id", controller.updateUser);
router.delete("/users/:id", controller.deleteUser);

module.exports = router;
