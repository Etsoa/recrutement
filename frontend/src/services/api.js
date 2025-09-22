import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 secondes de timeout pour debug
  // Retirer le Content-Type par défaut pour permettre FormData
  // headers: { 'Content-Type': 'application/json' } // Commenté pour permettre FormData
});

apiClient.interceptors.request.use(
  (config) => {
    console.log('🔵 API Request:', config.method?.toUpperCase(), config.baseURL + config.url);
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Si pas de Content-Type défini et pas FormData, utiliser JSON par défaut
    if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    console.log('📤 Request headers:', config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    console.log('🟢 API Response:', response.status, response.config.url);
    return response.data;
  },
  (error) => {
    console.error('🔴 API Error:', error.message);
    console.error('🔴 API Error config:', error.config?.url);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('La requête a pris trop de temps. Veuillez réessayer.');
    } else if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message;
      
      console.error('🔴 Response status:', status);
      console.error('🔴 Response data:', error.response.data);
      
      if (status === 408) {
        throw new Error('Timeout du serveur. Veuillez réessayer.');
      } else if (status >= 500) {
        throw new Error('Erreur serveur temporaire. Veuillez réessayer.');
      } else {
        throw new Error(message || `Erreur ${status}`);
      }
    } else if (error.request) {
      console.error('🔴 No response received:', error.request);
      throw new Error('Impossible de se connecter au serveur. Vérifiez votre connexion.');
    } else {
      console.error('🔴 Request setup error:', error.message);
      throw new Error('Erreur lors de la configuration de la requête');
    }
  }
);

export const api = {
  get: (endpoint, params = {}) => apiClient.get(endpoint, { params }),
  post: (endpoint, data = {}) => apiClient.post(endpoint, data),
  put: (endpoint, data = {}) => apiClient.put(endpoint, data),
  delete: (endpoint) => apiClient.delete(endpoint),
  
  annonces: {
    getAll: () => apiClient.get('/public/annonces'),
    getById: (id) => apiClient.post('/public/annonce', { id }),
    createCandidat: (candidatData) => apiClient.post('/public/create/candidat', candidatData),
  },
  
  parametres: {
    getAll: () => apiClient.get('/public/parametres'),
  },
};

export const authUtils = {
  setToken: (token) => localStorage.setItem('authToken', token),
  getToken: () => localStorage.getItem('authToken'),
  removeToken: () => localStorage.removeItem('authToken'),
  isAuthenticated: () => !!localStorage.getItem('authToken'),
};

export default apiClient;