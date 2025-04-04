const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const CustomError = require("./CustomError");

module.exports = {
    generateToken(payload, secret, expiresIn="15m") {
        return jwt.sign(payload, secret, { expiresIn, algorithm: 'HS256'});
    },

    verifyToken(token, secret) {
        if (!token) throw new CustomError("Token não fornecido!", 403);

        const decoded = jwt.verify(token, secret, (error, decoded) => {
            if (error) throw new CustomError("Token inválido!", 403);
            return decoded;
        });
        return decoded;
    },

    verifyPassword(password, cryptPassword) {
        return bcrypt.compare(password, cryptPassword);
    },

    hashPassword(password) {
        return bcrypt.hash(password, 10);
    },
};
