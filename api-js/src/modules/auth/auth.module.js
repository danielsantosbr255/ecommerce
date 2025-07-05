const router = require("express").Router();
const controller = require("./auth.controller");
const { verifyToken } = require("../../common/middlewares/auth.middleware");
// const getLocationFromIP = require("../../common/utils/getLocationFromIP");

router.post("/auth/sign-up", controller.signUp);
router.post("/auth/sign-in", controller.signIn);
router.post("/auth/sign-out", verifyToken, controller.signOut);
router.post("/auth/refresh", controller.refreshToken);

// router.get("/auth/location", async (req, res) => {
//   const location = await getLocationFromIP("45.175.30.157");
//   res.json(location);
// });

module.exports = router;
