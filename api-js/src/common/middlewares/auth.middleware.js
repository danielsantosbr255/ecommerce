const tools = require("../utils/Tools");
const CustomError = require("../utils/CustomError");

const authMiddleware = (requiredRole = null) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ");

        if (!token || token[0] !== "Bearer" || !token[1]) {
            throw new CustomError("Acesso negado!", 403);
        }

        const decoded = tools.verifyToken(token[1]);

        const { id, role } = decoded;

        if (requiredRole && role !== requiredRole) {
            throw new CustomError("Acesso negado!", 403);
        }

        req.user = { id, role };
        next();
    };
};

module.exports = authMiddleware;
