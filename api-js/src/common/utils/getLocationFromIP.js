async function getLocationFromIP(ip) {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = response.json();

    if (data.status === "success") {
      return {
        country: data.country, // "Brazil"
        region: data.regionName, // "Bahia"
        city: data.city, // "Salvador"
        lat: data.lat,
        lon: data.lon,
        org: data.org, // Operadora
      };
    }

    return null;
  } catch (error) {
    console.error("Erro ao obter geolocalização:", error.message);
    return null;
  }
}

module.exports = getLocationFromIP;
