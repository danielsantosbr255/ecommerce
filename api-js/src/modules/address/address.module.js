const express = require("express");
const controller = require("./address.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.get("/addresses", verifyToken, controller.getAddresses);
router.post("/addresses", verifyToken, controller.createAddress);
router.put("/addresses/:id", verifyToken, controller.updateAddress);
router.get("/addresses/:id", verifyToken, controller.getAddressById);
router.delete("/addresses/:id", verifyToken, controller.deleteAddress);

module.exports = router;
