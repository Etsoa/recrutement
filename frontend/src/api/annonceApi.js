import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getAllParametres = async () => {
  try {
    const response = await api.get('/unite/parametres');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAnnonce = async (data) => {
  try {
    const response = await api.post('/unite/create/annonce', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createNiveauFiliere = async (data) => {
  try {
    const response = await api.post('/unite/add/niveau_filiere', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createExperienceAnnonce = async (data) => {
  try {
    const response = await api.post('/unite/add/experienceAnnonce', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createLanguesAnnonce = async (data) => {
  try {
    const response = await api.post('/unite/add/langues', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createQualitesAnnonce = async (data) => {
  try {
    const response = await api.post('/unite/add/qualites', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getQCMAnnonce = async (data) => {
  try {
    const response = await api.get('/unite/qcmAnnonce/' + data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createQcmAnnonce = async (data) => {
  try {
    const response = await api.post('/unite/create/qcm', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const statusAnnonce = async (data) => {
  try {
    const response = await api.post('/unite/create/statusAnnonce', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllAnnonces = async (data) => {
  try {
    const response = await api.post('/unite/annonces', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAnnonceById = async (id) => {
  try {
    const response = await api.get(`/unite/annonces/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLanguesByAnnonce = async (id) => {
  try {
    const response = await api.get(`/unite/languesAnnonce/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getLangueById = async (id) => {
  try {
    const response = await api.get(`/unite/getLangueById/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getDetailsAnnonceById = async (id) => {
  try {
    const response = await api.get(`/unite/detailsAnnonceById/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// historique 
export const getDetailsHistorique = async (id) => {
  try {
    const response = await api.get(`/unite/detailsHistoriqueAnnonce/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
// qcm 
export const getDetailsQR = async (id) => {
  try {
    const response = await api.get(`/unite/detailsQRAnnonce/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
