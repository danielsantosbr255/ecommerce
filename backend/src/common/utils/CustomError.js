class CustomError extends Error {
  constructor(message, statusCode = 500, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error"; // 4xx para 'fail', 5xx para 'error'
    this.isOperational = true; // Erros operacionais são aqueles que esperamos e sabemos como lidar.
    this.errors = errors; // Adiciona um array para erros detalhados.

    // Captura o stack trace, excluindo o construtor do erro para um stack mais limpo.
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
