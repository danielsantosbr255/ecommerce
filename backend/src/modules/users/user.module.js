const express = require("express");
const controller = require("./user.controller");
const { AuthGuard } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.get("/users", AuthGuard, controller.getMany);
router.get("/users/:id", AuthGuard, controller.getOne);
router.put("/users/:id", AuthGuard, controller.update);
router.delete("/users/:id", AuthGuard, controller.delete);
router.get("/users/:id/resource", AuthGuard, controller.getResource);

module.exports = router;
