const bcrypt = require("bcryptjs");

exports.verifyPassword = (password, cryptPassword) => {
    return bcrypt.compare(password, cryptPassword);
};

exports.hashPassword = (password) => {
    return bcrypt.hash(password, 10);
};
