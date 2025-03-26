const { z } = require("zod");
const CustomError = require("../utils/CustomError");

module.exports = (error, req, res, next) => {
    if (error instanceof z.ZodError) {
        return res
            .status(400)
            .json({ errors: error.errors.map((e) => `${e.path[0]}: ${e.message}`) });
    }

    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error)

    return res.status(500).json({ error: "Erro interno no servidor" });
};
