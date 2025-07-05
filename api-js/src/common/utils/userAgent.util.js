const UAParser = require("ua-parser-js");

const getUserAgent = (userAgent) => {
  const ua = UAParser(userAgent);

  return {
    os: `${ua.os.name} ${ua.os.version}`.trim(),
    browser: `${ua.browser.name}`.trim(),
    device: ua.device.vendor || ua.device.model || ua.device.type || "Desktop",
  };
};

module.exports = { getUserAgent };
