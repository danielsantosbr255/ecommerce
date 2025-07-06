const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
// const paypal = require("./common/payment/paypal");

const errorHandler = require("./common/middlewares/error.handler");

// Modules
const AuthModule = require("./modules/auth/auth.module");
const CartModule = require("./modules/cart/cart.module");
const UsersModule = require("./modules/users/user.module");
const BrandModule = require("./modules/brands/brands.module");
const OrdersModule = require("./modules/orders/orders.module");
const AccountModule = require("./modules/account/account.module");
const AddressModule = require("./modules/address/address.module");
const ReviewsModule = require("./modules/reviews/reviews.module");
const SessionModule = require("./modules/sessions/session.module");
const ProductsModule = require("./modules/products/products.module");
const PromotionsModule = require("./modules/promotions/promotions.module");
const CategoriesModule = require("./modules/categories/categories.module");
const PermissionsModule = require("./modules/permissions/permissions.module");
const RolesModule = require("./modules/roles/role.module");

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use("/api", [
  AuthModule,
  UsersModule,
  ProductsModule,
  CartModule,
  OrdersModule,
  AccountModule,
  SessionModule,
  ReviewsModule,
  PromotionsModule,
  AddressModule,
  CategoriesModule,
  BrandModule,
  RolesModule,
  PermissionsModule,
]);

app.use(errorHandler);

module.exports = app;
