const express = require("express");
const router = express.Router();

const UserController = require("./user.controller");
const userAuth = require("../_app/middleware/authUser");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/profile", userAuth, UserController.getProfile);
router.put("/profile", userAuth, UserController.updateProfile);
router.delete("/profile", userAuth, UserController.deleteProfile);

module.exports = router;
