const UAParser = require("ua-parser-js");

const getUserAgent = (userAgent) => {
  const ua = UAParser(userAgent);

  const os = ua.os.name ? `${ua.os.name} ${ua.os.version}`.trim() : "Desconhecido";
  const browser = ua.browser.name ? `${ua.browser.name}`.trim() : "Desconhecido";
  const device = ua.device.vendor || ua.device.model || ua.device.type || "Desktop";

  return { os, browser, device };
};

module.exports = { getUserAgent };
