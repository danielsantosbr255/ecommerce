const { z } = require("zod");
const CustomError = require("../utils/CustomError"); // Ajuste o caminho se necessário
const { ANSIColors } = require("../../scripts/colors");

// --- Funções Auxiliares (mantidas como estão) ---
function formatZodErrorsForFrontend(error) {
  if (!error || !Array.isArray(error.issues)) {
    return ["Um erro inesperado de validação ocorreu."];
  }

  return error.issues.map((issue) => {
    const path = issue.path.join(".");
    let message = "";

    switch (issue.code) {
      case "invalid_type":
        message = `Campo '${path}': esperado ${issue.expected}, recebido ${issue.received}.`;
        break;
      case "invalid_string":
        if (issue.validation === "uuid") {
          message = `Campo '${path}': formato UUID inválido.`;
        } else if (issue.validation === "email") {
          message = `Campo '${path}': formato de e-mail inválido.`;
        } else {
          message = `Campo '${path}': ${issue.message}.`;
        }
        break;
      case "too_small":
        message = `Campo '${path}': deve ser no mínimo ${issue.minimum} ${issue.type === "string" ? "caracteres" : "e"}.`;
        break;
      case "too_big":
        message = `Campo '${path}': deve ser no máximo ${issue.maximum} ${issue.type === "string" ? "caracteres" : "e"}.`;
        break;
      case "invalid_literal":
        message = `Campo '${path}': valor inválido, esperado '${issue.expected}'.`;
        break;
      case "custom":
        message = `Campo '${path}': ${issue.message}.`;
        break;
      case "unrecognized_keys":
        message = `Campos não reconhecidos: ${issue.keys.join(", ")}.`;
        break;
      case "invalid_enum_value":
        message = `Campo '${path}': valor inválido, esperado um dos seguintes: ${issue.options
          .map((opt) => `'${opt}'`)
          .join(", ")}.`;
        break;
      default:
        message = `Campo '${path}': ${issue.message || "Erro de validação desconhecido."}`;
    }
    return message;
  });
}

function formatStackTrace(stack) {
  if (!stack) return "Stack trace não disponível.";

  // Divide o stack em linhas, filtra linhas irrelevantes e formata
  return stack
    .split("\n")
    .filter((line) => line.includes("at ") && !line.includes("node_modules")) // Filtra linhas de 'node_modules'
    .map((line) => `  ${line.trim()}`) // Adiciona indentação para melhor leitura
    .join("\n");
}

// --- Middleware de Erro com Cores ---
module.exports = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = "Erro interno no servidor.";
  let errors = [];
  let stackToLog = formatStackTrace(error.stack);

  if (res.headersSent) {
    return next(error); // não tenta responder de novo
  }

  // --- Lógica para Resposta ao Frontend e Log no Backend ---
  if (error instanceof z.ZodError) {
    statusCode = 400;
    message = "Erro de validação nos dados fornecidos.";
    errors = formatZodErrorsForFrontend(error);

    // Log formatado com cores para erros Zod
    console.error(`${ANSIColors.BRIGHT_RED}--- ❌ ERRO DE VALIDAÇÃO ZOD DETECTADO ---${ANSIColors.RESET}`);
    console.error(`${ANSIColors.YELLOW}Status: ${statusCode}${ANSIColors.RESET}`);
    console.error(`${ANSIColors.YELLOW}Mensagem para o Frontend: ${message}${ANSIColors.RESET}`);
    console.error(`${ANSIColors.YELLOW}Erros Detalhados (Backend Log):${ANSIColors.RESET}`);
    errors.forEach((err) => console.error(`${ANSIColors.MAGENTA}- ${err}${ANSIColors.RESET}`)); // Cada erro em magenta
    console.error(`${ANSIColors.BLUE}Caminho da Requisição: ${req.method} ${req.originalUrl}${ANSIColors.RESET}`);
    console.error(`${ANSIColors.BLUE}Stack Trace:\n${ANSIColors.RED}${stackToLog}${ANSIColors.RESET}`); // Stack em vermelho
    console.error(`${ANSIColors.BRIGHT_RED}---------------------------------------${ANSIColors.RESET}\n`);
  } else if (error instanceof CustomError) {
    statusCode = error.statusCode;
    message = error.message;
    errors = error.errors;

    // Log formatado com cores para CustomErrors
    console.error(`${ANSIColors.BRIGHT_RED}--- ❌ CUSTOM ERROR DETECTADO ---${ANSIColors.RESET}`);
    console.error(`${ANSIColors.YELLOW}Status: ${statusCode}${ANSIColors.RESET}`);
    console.error(`${ANSIColors.YELLOW}Mensagem: ${message}${ANSIColors.RESET}`);
    if (errors && errors.length > 0) {
      console.error(`${ANSIColors.YELLOW}Detalhes do Erro:${ANSIColors.RESET}`);
      // Itera sobre os erros para colorir cada um, se forem objetos
      errors.forEach((err) => {
        console.error(`${ANSIColors.MAGENTA}- ${JSON.stringify(err, null, 2)}${ANSIColors.RESET}`);
      });
    }
    console.error(`${ANSIColors.BLUE}Caminho da Requisição: ${req.method} ${req.originalUrl}${ANSIColors.RESET}`);
    console.error(`${ANSIColors.BLUE}Stack Trace:\n${ANSIColors.RED}${stackToLog}${ANSIColors.RESET}`);
    console.error(`${ANSIColors.BRIGHT_RED}----------------------------------${ANSIColors.RESET}\n`);
  } else {
    // Erros genéricos ou internos
    if (process.env.NODE_ENV === "production") {
      message = "Ocorreu um erro inesperado. Tente novamente mais tarde.";
    } else {
      message = error.message || "Ocorreu um erro interno desconhecido.";
    }

    // Log formatado com cores para erros internos
    console.error(`${ANSIColors.BRIGHT_RED}--- ❌ ERRO INTERNO DO SERVIDOR ---${ANSIColors.RESET}`);
    console.error(`${ANSIColors.YELLOW}Status: ${statusCode}${ANSIColors.RESET}`);
    console.error(`${ANSIColors.YELLOW}Mensagem: ${error.message || message}${ANSIColors.RESET}`);
    if (error.name) {
      console.error(`${ANSIColors.YELLOW}Tipo do Erro: ${error.name}${ANSIColors.RESET}`);
    }
    console.error(`${ANSIColors.BLUE}Caminho da Requisição: ${req.method} ${req.originalUrl}${ANSIColors.RESET}`);
    console.error(`${ANSIColors.BLUE}Stack Trace:\n${ANSIColors.RED}${stackToLog}${ANSIColors.RESET}`);
    console.error(`${ANSIColors.BRIGHT_RED}-----------------------------------${ANSIColors.RESET}\n`);
  }

  // --- Resposta Final ao Frontend (sem cores, pois é JSON) ---
  res.status(statusCode).json({
    status: statusCode >= 400 && statusCode < 500 ? "fail" : "error",
    message: message,
    ...(errors.length > 0 && { errors: errors }),
  });
};
