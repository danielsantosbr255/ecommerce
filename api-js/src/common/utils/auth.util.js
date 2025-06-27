const bcrypt = require("bcryptjs");

exports.verifyPassword = (password, cryptPassword) => {
  return bcrypt.compare(password, cryptPassword);
};

exports.hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

exports.normalizeIp = (ip) => {
  // if (ip === "::1" || ip === "::ffff:127.0.0.1") {
  //   return "127.0.0.1";
  // }
  return ip;
};
