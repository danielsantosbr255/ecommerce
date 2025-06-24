const express = require("express");
const controller = require("./account.controller");
const addressController = require("../address/address.controller");

const { verifyToken } = require("../../common/middlewares/auth.middleware");

const router = express.Router();

router.use(verifyToken);

router.get("/account", controller.getMyAccount);
router.put("/account", controller.updateMyAccount);
router.delete("/account", controller.deleteMyAccount);

// Address routes
router.get("/account/addresses", addressController.getAddresses);
router.post("/account/addresses", addressController.createAddress);
router.put("/account/addresses/:id", addressController.updateAddress);
router.get("/account/addresses/:id", addressController.getAddressById);
router.delete("/account/addresses/:id", addressController.deleteAddress);

module.exports = router;
