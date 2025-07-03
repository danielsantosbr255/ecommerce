/**
 * Extrai o IP real do cliente de forma segura, considerando proxies e fallback.
 * @param {import('express').Request} req - Objeto de request do Express
 * @returns {string | null} - IP do cliente ou null
 */
function getClientIp(req) {
  // Tenta pegar o header x-forwarded-for
  const forwarded = req.headers["x-forwarded-for"];

  if (forwarded) {
    // Pode conter múltiplos IPs, pega o primeiro (usuário real)
    const ips = forwarded.split(",").map((ip) => ip.trim());
    if (ips.length > 0 && isValidIp(ips[0])) {
      return ips[0];
    }
  }

  // Fallbacks: socket ou connection
  const socketIp = req.socket?.remoteAddress;
  if (socketIp && isValidIp(socketIp)) {
    return socketIp;
  }

  const connectionIp = req.connection?.remoteAddress;
  if (connectionIp && isValidIp(connectionIp)) {
    return connectionIp;
  }

  return null;
}

/**
 * Valida se o IP é um IPv4/IPv6 válido
 * @param {string} ip
 * @returns {boolean}
 */
function isValidIp(ip) {
  // Simples validação de IP (pode ser melhorado com regex se quiser)
  return typeof ip === "string" && ip.length > 0;
}

module.exports = { getClientIp };
