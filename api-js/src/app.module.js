const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const errorHandler = require("./common/middlewares/error.handler");

const AuthModule = require("./modules/auth/auth.module");
const UserModule = require("./modules/user/user.module");
const CartModule = require("./modules/cart/cart.module");
const OrdersModule = require("./modules/orders/orders.module");
const ReviewsModule = require("./modules/reviews/reviews.module");
const ProductsModule = require("./modules/products/products.module");
const PromotionsModule = require("./modules/promotions/promotions.module");

const app = express();

// TODO: Refactor verify if the env variable is set and if not, set a default value
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",") || ["http://localhost:3000"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(AuthModule, UserModule, ProductsModule, CartModule, OrdersModule, ReviewsModule, PromotionsModule);

app.use(errorHandler);

module.exports = app;
