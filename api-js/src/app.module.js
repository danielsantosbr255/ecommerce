const express = require("express");
const cors = require("cors");
const errorHandler = require("./common/middlewares/error.handler");

const AuthModule = require("./modules/auth/auth.module");
const UserModule = require("./modules/user/user.module");
const CartModule = require("./modules/cart/cart.module");
const OrdersModule = require("./modules/orders/orders.module");
const ProductsModule = require("./modules/products/products.module");

const app = express();

app.use(cors());
app.use(express.json());

app.use([AuthModule, UserModule, ProductsModule, CartModule, OrdersModule]);

app.use(errorHandler);

module.exports = app;
