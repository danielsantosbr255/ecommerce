const express = require("express");
const controller = require("./address.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.get("/addresses", verifyToken, controller.getAll);
router.post("/addresses", verifyToken, controller.create);
router.put("/addresses/:id", verifyToken, controller.update);
router.get("/addresses/:id", verifyToken, controller.getById);
router.delete("/addresses/:id", verifyToken, controller.remove);

module.exports = router;
