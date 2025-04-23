const { z } = require("zod");
const CustomError = require("../utils/CustomError");

module.exports = (error, req, res, next) => {
    console.log(error)
    if (error instanceof z.ZodError) {
        return res
            .status(400)
            .json({ message: error.errors.map((e) => `Campo '${e.path[0]}' ${e.message}`) });
    }

    if (error instanceof CustomError) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }

    return res.status(500).json({ error: "Erro interno no servidor" });
};
