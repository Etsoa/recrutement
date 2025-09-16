// services/api.js - Configuration de base pour les appels API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Configuration par défaut pour les requêtes
const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Intercepteur pour ajouter le token d'authentification
const addAuthToken = (config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      },
    };
  }
  return config;
};

// Wrapper pour fetch avec gestion d'erreurs
const apiCall = async (endpoint, config = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const finalConfig = addAuthToken({ ...defaultConfig, ...config });

  try {
    const response = await fetch(url, finalConfig);
    
    // Gestion des erreurs HTTP
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    // Tenter de parser la réponse JSON
    const data = await response.json().catch(() => ({}));
    return data;
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    
    // Gestion des erreurs spécifiques
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Impossible de se connecter au serveur. Vérifiez votre connexion.');
    }
    
    throw error;
  }
};

// Méthodes HTTP
export const api = {
  get: (endpoint, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return apiCall(url, { method: 'GET' });
  },

  post: (endpoint, data = {}) => {
    return apiCall(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put: (endpoint, data = {}) => {
    return apiCall(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  patch: (endpoint, data = {}) => {
    return apiCall(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: (endpoint) => {
    return apiCall(endpoint, { method: 'DELETE' });
  },

  // Upload de fichiers
  upload: (endpoint, formData) => {
    const token = localStorage.getItem('authToken');
    const config = {
      method: 'POST',
      body: formData,
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    };
    
    return fetch(`${API_BASE_URL}${endpoint}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }
        return response.json();
      });
  },
};

// Helper pour gérer les tokens d'authentification
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

export default api;
