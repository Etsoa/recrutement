import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export const api = {
  get: (endpoint, params = {}) => apiClient.get(endpoint, { params }),
  post: (endpoint, data = {}) => apiClient.post(endpoint, data),
  annonces: {
    getAll: () => apiClient.get('/public/annonces'),
    getById: (id) => apiClient.post('/public/annonce', { id }),
  },
  parametres: {
    getAll: () => apiClient.get('/public/parametres'),
  },
};

export const authUtils = {
  setToken: (token) => {
    localStorage.setItem('authToken', token);
  },
  getToken: () => {
    return localStorage.getItem('authToken');
  },
  removeToken: () => {
    localStorage.removeItem('authToken');
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};

export default apiClient;
