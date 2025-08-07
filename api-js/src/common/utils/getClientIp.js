/**
 * Extrai o IP real do cliente de forma segura, considerando proxies e fallback.
 * @param {import('express').Request} req - Objeto de request do Express
 * @returns {string | null} - IP do cliente ou null
 */
function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];

  if (forwarded) {
    const ips = forwarded.split(",").map((ip) => ip.trim());
    if (ips.length > 0 && isValidIp(ips[0])) {
      return ips[0];
    }
  }

  const socketIp = req.socket?.remoteAddress;
  if (socketIp && isValidIp(socketIp)) {
    return socketIp;
  }

  return null;
}

/**
 * Valida se o IP é um IPv4/IPv6 válido
 * @param {string} ip
 * @returns {boolean}
 */
function isValidIp(ip) {
  // Validação de IP com regex
  const ipv4Regex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  const ipv6Regex =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}:[0-9a-fA-F]{1,4}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9])\.){2}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9])\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]))$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

module.exports = { getClientIp };
