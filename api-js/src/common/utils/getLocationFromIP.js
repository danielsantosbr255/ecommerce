async function getLocationFromIP(ip) {
  try {
    const res = await fetch(`https://ipwho.is/${ip}`);
    const data = await res.json();
    if (data.success) return `${data.city}, ${data.region}, ${data.country}`;
  } catch (e) {
    console.error("Erro ao buscar localização:", e);
  }
  return null;
}

module.exports = { getLocationFromIP };
