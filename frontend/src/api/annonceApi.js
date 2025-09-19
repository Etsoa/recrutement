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
  try{
    const response = await api.post('/unite/add/niveau_filiere', data);
    return response.data; 
  } catch (error) {
    throw error;
  }
}

export const createExperienceAnnonce = async (data) => {
  try{
    const response = await api.post('/unite/add/experienceAnnonce', data);
    return response.data; 
  } catch (error) {
    throw error;
  }
}

export const createLanguesAnnonce = async (data) => {
  try{
    const response = await api.post('/unite/add/langues', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createQualitesAnnonce = async (data) => {
  try{
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