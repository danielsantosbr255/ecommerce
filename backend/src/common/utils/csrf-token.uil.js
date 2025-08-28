function generateCsrfToken(req, res, next) {
  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto.randomBytes(32).toString("hex");
  }
  next();
}

function validateCsrfToken(req, res, next) {
  const mutableMethods = ["POST", "PUT", "DELETE"];
  if (mutableMethods.includes(req.method)) {
    const providedToken = req.headers["x-csrf-token"] || req.body._csrf;
    if (!providedToken || providedToken !== req.session.csrfToken) {
      return res.status(403).json({ error: "Token CSRF inválido. Requisição bloqueada por razões de segurança." });
    }
    // req.session.csrfToken = crypto.randomBytes(32).toString('hex');
  }
  next();
}

module.exports = { generateCsrfToken, validateCsrfToken };
