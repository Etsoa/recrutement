import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getAllUnites = async () => {
  try {
    const response = await api.get('/unite/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUnite = async (username, password) => {
  try {
    const response = await api.post('/unite/login', { username, password });
    return response.data; // { message, data: { token, unite }, success }
  } catch (error) {
    throw error;
  }
};
