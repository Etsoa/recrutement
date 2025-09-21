import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      throw new Error(error.response.data?.message || `Erreur ${error.response.status}`);
    } else if (error.request) {
      throw new Error('Impossible de se connecter au serveur.');
    } else {
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