import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getPostesByIdUnite = async (id) => {
  try {
    const response = await api.get(`/unite/postesByUnite/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllParametres = async () => {
  try {
    const response = await api.get('/unite/parametres');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPoste = async (data) => {
  try {
    const response = await api.post('/unite/create/poste', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updatePoste = async (data) => {
  try {
    const response = await api.put('/unite/update/poste', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createGenre = async (data) => {
  try {
    const response = await api.post('/unite/create/genre', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createVille = async (data) => {
  try {
    const response = await api.post('/unite/create/ville', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createNiveau = async (data) => {
  try {
    const response = await api.post('/unite/create/niveau', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createFiliere = async (data) => {
  try {
    const response = await api.post('/unite/create/filiere', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createDomaine = async (data) => {
  try {
    const response = await api.post('/unite/create/domaine', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};  
export const createLangue = async (data) => {
  try {
    const response = await api.post('/unite/create/langue', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createQualite = async (data) => {
  try {
    const response = await api.post('/unite/create/qualite', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const createSituationMatrimoniale = async (data) => {
//   try {
//     const response = await api.post('/unite/create/situation_matrimoniale', data);
//     return response.data;
//   }
//   catch (error) {
//     throw error;
//   }
// };

export const createQuestionQcm = async (data) => {
  try{
    const response = await api.post('/unite/create/questions', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createReponseQcm = async (data) => {
  try{
    const response = await api.post('/unite/create/reponses', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getQuestionsReponses = async () => {
  try {
    const response = await api.get('/unite/questionsReponses');
    return response.data;
  } catch (error) {
    throw error;
  }
};