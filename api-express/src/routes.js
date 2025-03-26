const routes = require("express").Router();

routes.use("/user", require("./user/user.routes"));
routes.use("/admin", require("./admin/admin.routes"));

module.exports = routes;
