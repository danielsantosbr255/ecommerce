const { z } = require("zod");
const CustomError = require("../utils/CustomError");
const { ANSIColors } = require("../utils/colors");

function formatZodErrorsForFrontend(error) {
  if (!error || !Array.isArray(error.issues)) {
    return ["Um erro inesperado de validação ocorreu."];
  }

  return error.issues.map((issue) => {
    const path = issue.path.join(".");
    switch (issue.code) {
      case "invalid_type":
        return `Campo '${path}': esperado ${issue.expected}, recebido ${issue.received}.`;
      case "invalid_string":
        if (issue.validation === "uuid") return `Campo '${path}': formato UUID inválido.`;
        if (issue.validation === "email") return `Campo '${path}': formato de e-mail inválido.`;
        return `Campo '${path}': ${issue.message}.`;
      case "too_small":
        return `Campo '${path}': deve ser no mínimo ${issue.minimum} ${issue.type === "string" ? "caracteres" : "e"}.`;
      case "too_big":
        return `Campo '${path}': deve ser no máximo ${issue.maximum} ${issue.type === "string" ? "caracteres" : "e"}.`;
      case "invalid_literal":
        return `Campo '${path}': valor inválido, esperado '${issue.expected}'.`;
      case "custom":
        return `Campo '${path}': ${issue.message}.`;
      case "unrecognized_keys":
        return `Campos não reconhecidos: ${issue.keys.join(", ")}.`;
      case "invalid_enum_value":
        return `Campo '${path}': valor inválido, esperado um dos seguintes: ${issue.options
          .map((opt) => `'${opt}'`)
          .join(", ")}.`;
      default:
        return `Campo '${path}': ${issue.message || "Erro de validação desconhecido."}`;
    }
  });
}

function formatStackTrace(stack) {
  if (!stack) return "Stack trace não disponível.";
  return stack
    .split("\n")
    .filter((line) => line.includes("at ") && !line.includes("node_modules"))
    .map((line) => `  ${line.trim()}`)
    .join("\n");
}

const errorConfigs = {
  ZodError: {
    statusCode: 400,
    message: "Erro de validação nos dados fornecidos.",
    getErrors: (error) => formatZodErrorsForFrontend(error),
    logTitle: "ERRO DE VALIDAÇÃO ZOD DETECTADO",
  },
  CustomError: {
    statusCode: (error) => error.statusCode,
    message: (error) => error.message,
    getErrors: (error) => error.errors || [],
    logTitle: "CUSTOM ERROR DETECTADO",
  },
  EBADCSRFTOKEN: {
    statusCode: 403,
    message: "CSRF token inválido.",
    getErrors: () => [],
    logTitle: "ERRO DE CSRF DETECTADO",
  },
  Default: {
    statusCode: 500,
    message: () =>
      process.env.NODE_ENV === "production"
        ? "Ocorreu um erro inesperado. Tente novamente mais tarde."
        : "Ocorreu um erro interno desconhecido.",
    getErrors: () => [],
    logTitle: "ERRO INTERNO DO SERVIDOR",
  },
};

// --- Centralized Logging Function ---
function logError({ error, config, req, stackTrace }) {
  console.error(`${ANSIColors.BRIGHT_RED}--- ❌ ${config.logTitle} ---${ANSIColors.RESET}`);
  console.error(
    `${ANSIColors.YELLOW}Status: ${typeof config.statusCode === "function" ? config.statusCode(error) : config.statusCode}${
      ANSIColors.RESET
    }`
  );
  console.error(
    `${ANSIColors.YELLOW}Mensagem: ${typeof config.message === "function" ? config.message(error) : config.message}${
      ANSIColors.RESET
    }`
  );

  if (error.name && config.logTitle === "ERRO INTERNO DO SERVIDOR") {
    console.error(`${ANSIColors.YELLOW}Tipo do Erro: ${error.name}${ANSIColors.RESET}`);
  }

  const errors = config.getErrors(error);
  if (errors.length > 0) {
    console.error(`${ANSIColors.YELLOW}Detalhes do Erro:${ANSIColors.RESET}`);
    errors.forEach((err) =>
      console.error(`${ANSIColors.MAGENTA}- ${typeof err === "string" ? err : JSON.stringify(err, null, 2)}${ANSIColors.RESET}`)
    );
  }

  console.error(`${ANSIColors.BLUE}Caminho da Requisição: ${req.method} ${req.originalUrl}${ANSIColors.RESET}`);
  console.error(`${ANSIColors.BLUE}Stack Trace:\n${ANSIColors.RED}${stackTrace}${ANSIColors.RESET}`);
  console.error(`${ANSIColors.BRIGHT_RED}----------------------------------${ANSIColors.RESET}\n`);
}

// --- Refactored Error Handler Middleware ---
module.exports = (error, req, res, next) => {
  if (res.headersSent) return next(error);

  const stackTrace = formatStackTrace(error.stack);
  const errorType =
    error instanceof z.ZodError
      ? "ZodError"
      : error instanceof CustomError
      ? "CustomError"
      : error.code === "EBADCSRFTOKEN"
      ? "EBADCSRFTOKEN"
      : "Default";
  const config = errorConfigs[errorType];

  const statusCode = typeof config.statusCode === "function" ? config.statusCode(error) : config.statusCode;
  const message = typeof config.message === "function" ? config.message(error) : config.message;
  const errors = config.getErrors(error);

  logError({ error, config, req, stackTrace });

  res.status(statusCode).json({
    success: false,
    code: error.code,
    status: statusCode >= 400 && statusCode < 500 ? "fail" : "error",
    message,
    ...(errors.length > 0 && { errors }),
  });
};
