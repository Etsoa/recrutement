const API_URL = 'http://localhost:5000/api/rh';

const rhService = {
  // Login
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  // Formulaire annonce
  getFormAnnonceData: async () => {
    const response = await fetch(`${API_URL}/form-annonce`);
    return response.json();
  },

  // Créer annonce
  createAnnonce: async (annonceData) => {
    const queryParams = new URLSearchParams(annonceData).toString();
    const response = await fetch(`${API_URL}/create/annonce?${queryParams}`, {
      method: 'GET'
    });
    return response.json();
  },

  // Suggestions
  getSuggestions: async () => {
    const response = await fetch(`${API_URL}/suggestions`);
    return response.json();
  },

  // Entretiens RH
  createRhEntretien: async (data) => {
    const response = await fetch(`${API_URL}/create/rh_entretien`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  getEntretiensJour: async (date) => {
    const response = await fetch(`${API_URL}/rh_entretiens_jour?day=${date}`);
    return response.json();
  },

  updateDateEntretien: async (id_rh_entretien, nouvelle_date) => {
    const response = await fetch(`${API_URL}/update/date/rh_entretien`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_rh_entretien, nouvelle_date })
    });
    return response.json();
  },

  updateStatusEntretien: async (id_rh_entretien, id_type_status_entretien) => {
    const response = await fetch(`${API_URL}/update/status/rh_entretien`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_rh_entretien, id_type_status_entretien })
    });
    return response.json();
  },

  getDisponibilites: async (id_rh, date) => {
    const response = await fetch(`${API_URL}/disponibilites/rh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_rh, date })
    });
    return response.json();
  },

  reserveEntretien: async (data) => {
    const response = await fetch(`${API_URL}/reserve/rh_entretien`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  getProchaineDisponibilite: async (id_rh, date_depart) => {
    const response = await fetch(`${API_URL}/prochaine_disponibilite/rh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_rh, date_depart })
    });
    return response.json();
  },

  createScore: async (data) => {
    const response = await fetch(`${API_URL}/create/score/rh_entretien`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  suggestToCeo: async (data) => {
    const response = await fetch(`${API_URL}/suggest/ceo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  getCeoSuggestions: async () => {
    const response = await fetch(`${API_URL}/suggest/`);
    return response.json();
  }
};

export default rhService;
