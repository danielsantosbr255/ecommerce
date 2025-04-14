const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const errorHandler = require("./common/middlewares/error.handler");

const AuthModule = require("./modules/auth/auth.module");
const UserModule = require("./modules/user/user.module");
const CartModule = require("./modules/cart/cart.module");
const OrdersModule = require("./modules/orders/orders.module");
const ProductsModule = require("./modules/products/products.module");

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",") || ["http://localhost:3000"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(AuthModule, UserModule, ProductsModule, CartModule, OrdersModule);

app.use(errorHandler);

module.exports = app;
