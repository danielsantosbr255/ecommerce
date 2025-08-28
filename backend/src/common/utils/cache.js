const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 300, checkperiod: 120 }); // TTL padrão de 300 segundos (5 minutos)

// 'stdTTL' (Standard Time-to-Live): Define o tempo de vida padrão de cada item em segundos.
// 'checkperiod': Com que frequência o cache deve verificar e limpar itens expirados.

module.exports = myCache;
