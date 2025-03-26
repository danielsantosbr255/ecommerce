const jwt = require("jsonwebtoken");

const CustomError = require("../utils/CustomError");

const adminAuth = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new CustomError("Token não fornecido", 401);
    }

    const token = authHeader.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) throw new CustomError("Token inválido ou expirado", 403);

        if (!user.role == "admin") {
            throw new CustomError("Acesso negado", 403);
        }
        req.user = user;
        next();
    });
};

module.exports = adminAuth;
