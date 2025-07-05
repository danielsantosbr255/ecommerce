async function getLocationFromIP(ip) {
  try {
    const token = process.env.IPINFO_TOKEN;
    const response = await fetch(`https://ipinfo.io/${ip}?token=${token}`);
    const data = await response.json();

    return {
      ip: data.ip,
      hostname: data.hostname,
      city: data.city,
      region: data.region,
      country: data.country,
      loc: data.loc,
      org: data.org,
      postal: data.postal,
      timezone: data.timezone,
    };
  } catch (error) {
    console.error("Erro ao obter geolocalização:", error.message);
    return null;
  }
}

module.exports = getLocationFromIP;
