const express = require("express");
const controller = require("./address.controller");
const { AuthGuard } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.get("/addresses", AuthGuard, controller.getAll);
router.post("/addresses", AuthGuard, controller.create);
router.put("/addresses/:id", AuthGuard, controller.update);
router.get("/addresses/:id", AuthGuard, controller.getById);
router.delete("/addresses/:id", AuthGuard, controller.remove);

module.exports = router;
