const express = require("express");
const controller = require("./user.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.get("/users", verifyToken, controller.getMany);
router.get("/users/:id", verifyToken, controller.getOne);
router.put("/users/:id", verifyToken, controller.update);
router.delete("/users/:id", verifyToken, controller.delete);

module.exports = router;
