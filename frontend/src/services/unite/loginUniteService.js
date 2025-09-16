import { API_BASE } from '../../utils/config';

// Fonction de login
export async function loginUnite(username, password) {
  try {
    const response = await fetch(`${API_BASE}/unite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Nom ou mot de passe incorrect');
    }

    return data.data; // retourne le résultat si succès
  } catch (err) {
    throw err;
  }
}
