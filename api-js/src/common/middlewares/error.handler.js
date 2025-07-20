const { z } = require("zod");
const CustomError = require("../utils/CustomError");

module.exports = (error, req, res, next) => {
  let formatedError = { statusCode: 500, message: "Erro interno no servidor." };

  if (error instanceof z.ZodError) {
    formatedError = { statusCode: 400, message: error.errors.map((e) => `Campo '${e.path[0]}' ${e.message}`) };
    console.log("❌ [ERROR]", formatedError);
    return res.status(400).json({ message: formatedError.message });
  }

  if (error instanceof CustomError) {
    formatedError = { statusCode: error.statusCode, message: error.message };
    console.log("❌ [ERROR]", formatedError);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }

  console.log("❌ [ERROR]", error);
  return res.status(500).json({ message: formatedError });
};
