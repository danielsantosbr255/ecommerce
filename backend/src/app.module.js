const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
// const csrf = require("@dr.pogodin/csurf");
const cookieParser = require("cookie-parser");
const { manageSession } = require("./common/utils/session");
const errorHandler = require("./common/middlewares/error.handler");

// #region | Modules
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
const PaymentsModule = require("./modules/payments/payments.module");
const PromotionsModule = require("./modules/promotions/promotions.module");
const CategoriesModule = require("./modules/categories/categories.module");
const PermissionsModule = require("./modules/permissions/permissions.module");
// #endregion

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"];

const app = express();
const router = express.Router();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(manageSession());
// app.use(csrf({ cookie: true }));

router.get("/", (req, res) => res.send("Hello world!"));

app.use("/", router);

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
  PaymentsModule,
]);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Endpoint não encontrado" });
});

app.use(errorHandler);

module.exports = app;
