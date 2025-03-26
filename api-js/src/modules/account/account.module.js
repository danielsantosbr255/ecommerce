const router = require("express").Router();
const controller = require("./account.controller");
const userController = require("../user/user.controller")

router.get("/profile", controller.getProfile);
router.put("/profile",  userController.updateUser);

module.exports = router;
