const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const CustomError = require("./CustomError");

module.exports = {
    hashPassword: (password) => {
        return bcrypt.hash(password, 10);
    },

    generateToken: (payload) => {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    },

    verifyPassword: (password, cryptPassword) => {
        return bcrypt.compare(password, cryptPassword);
    },

    verifyToken: (token) => {
        if (!token) throw new CustomError("Token não fornecido!");

        const decoded = jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) throw new CustomError("Token inválido!");
            return decoded;
        });
        return decoded;
    },
};
