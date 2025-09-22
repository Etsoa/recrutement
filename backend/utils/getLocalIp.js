const os = require('os');

/**
 * Obtient dynamiquement l'adresse IP locale de l'ordinateur
 * @returns {string} L'adresse IP locale (ex: "192.168.1.100")
 */
function getLocalIpAddress() {
  const networkInterfaces = os.networkInterfaces();
  
  // Parcourir toutes les interfaces réseau
  for (const interfaceName of Object.keys(networkInterfaces)) {
    const networkInterface = networkInterfaces[interfaceName];
    
    // Chercher une interface IPv4 non-interne (pas localhost)
    for (const network of networkInterface) {
      // Vérifier que c'est IPv4 et pas une adresse interne (localhost)
      if (network.family === 'IPv4' && !network.internal) {
        console.log(`IP locale détectée: ${network.address} (interface: ${interfaceName})`);
        return network.address;
      }
    }
  }
  
  // Si aucune IP trouvée, retourner localhost par défaut
  console.warn('Aucune IP locale trouvée, utilisation de localhost');
  return 'localhost';
}

/**
 * Génère l'URL complète du frontend avec l'IP dynamique
 * @param {number} port - Le port du frontend (par défaut 3000)
 * @returns {string} L'URL complète (ex: "http://192.168.1.100:3000")
 */
function getFrontendUrl(port = 3000) {
  const localIp = getLocalIpAddress();
  return `http://${localIp}:${port}`;
}

module.exports = {
  getLocalIpAddress,
  getFrontendUrl
};