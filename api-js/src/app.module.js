const path = require("path");
const express = require("express");
const errorHandler = require("./config/middlewares/error.handler");
const authMiddleware = require("./config/middlewares/auth.middleware");

const authModule = require("./modules/auth/auth.module");
const userModule = require("./modules/user/user.module");
const cartModule = require("./modules/cart/cart.module");
const productsModule = require("./modules/products/products.module");
const ordersModule = require("./modules/orders/orders.module");

const app = express();

app.use(express.json());
// app.use(express.static(path.join(__dirname, "config/public")));

app.use("/auth", authModule);
app.use("/products", productsModule);
app.use("/", authMiddleware(), userModule);
app.use("/cart", authMiddleware(), cartModule);
app.use("/orders", authMiddleware(), ordersModule);

app.use(errorHandler);

module.exports = app;
