const session = require("express-session");
const { RedisStore } = require("connect-redis");
const { getRedis } = require("../database/redis");

const redisStore = new RedisStore({ client: getRedis() });

const manageSession = () => {
  return session({
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
  });
};

module.exports = { manageSession };
