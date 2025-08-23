const cors = require("cors");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { RedisStore } = require("connect-redis");
const paypal = require("./common/payment/paypal");
const { getRedis } = require("./common/database/redis");
const errorHandler = require("./common/middlewares/error.handler");

const AuthModule = require("./modules/auth/auth.module");
const CartModule = require("./modules/cart/cart.module");
const UsersModule = require("./modules/users/user.module");
const RolesModule = require("./modules/roles/role.module");
const BrandModule = require("./modules/brands/brands.module");
const OrdersModule = require("./modules/orders/orders.module");
const UploadModule = require("./modules/uploads/uploads.module");
const MembersModule = require("./modules/members/members.module");
const AddressModule = require("./modules/address/address.module");
const ReviewsModule = require("./modules/reviews/reviews.module");
const SessionModule = require("./modules/sessions/session.module");
const ProductsModule = require("./modules/products/products.module");
const PromotionsModule = require("./modules/promotions/promotions.module");
const CategoriesModule = require("./modules/categories/categories.module");
const PermissionsModule = require("./modules/permissions/permissions.module");

const redisStore = new RedisStore({ client: getRedis() });
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"];

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(
  session({
    store: redisStore,
    name: "sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1 dia
    },
  })
);

app.use("/api", [
  UploadModule,
  AuthModule,
  UsersModule,
  ProductsModule,
  CartModule,
  OrdersModule,
  SessionModule,
  ReviewsModule,
  PromotionsModule,
  AddressModule,
  CategoriesModule,
  BrandModule,
  RolesModule,
  PermissionsModule,
  MembersModule,
]);

app.use(errorHandler);

module.exports = app;
