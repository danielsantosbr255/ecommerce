const router = require("express").Router();

const adminAuth = require("../_app/middleware/authAdmin");
const AdminController = require("./admin.controller");

router.get("/users", adminAuth, AdminController.getUsers);
router.get("/users/:id", adminAuth, AdminController.getUserById);
router.put("/users/:id", adminAuth, AdminController.updateUser);
router.delete("/users/:id", adminAuth, AdminController.deleteUser);
router.post("/users/create", adminAuth, AdminController.createUser);

module.exports = router;
