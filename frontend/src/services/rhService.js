
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
  
    // Mettre à jour le statut d'une suggestion RH
  updateStatusSuggestion: async (data) => {
    // data doit contenir : id_rh_suggestion, id_type_status_suggestion, date_entretien (optionnel), id_rh (optionnel)
    // Si data.date_entretien et data.id_rh sont fournis, on vérifie qu'il n'y a pas déjà un entretien prévu ce jour-là pour ce RH
    if (data.date_entretien && data.id_rh) {
      const entretiens = await rhService.getEntretiensParJour(data.date_entretien);
      const dejaPris = entretiens.some(e => e.id_rh === data.id_rh);
      if (dejaPris) {
        return { success: false, message: "Un entretien est déjà prévu pour ce RH à cette date." };
      }
    }
    const response = await fetch(`${API_URL}/suggestion/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  getEntretiensParJour: async (date) => {
    const response = await fetch(`${API_URL}/rh_entretiens_jour?day=${date}`);
    return response.json();
  },

  // Récupérer toutes les annonces
  getAllAnnonces: async () => {
    const response = await fetch(`${API_URL}/annonces`);
    return response.json();
  },

  // Récupérer les données pour le formulaire d'annonce
  getFormAnnonceData: async () => {
    const response = await fetch(`${API_URL}/form-annonce`);
    return response.json();
  },

  // Mettre à jour le statut d'une annonce
  updateAnnonceStatus: async (data) => {
    const response = await fetch(`${API_URL}/annonce/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  getEntretiensParMois: async (start, end) => {
    const response = await fetch(`${API_URL}/rh_entretiens_mois?start=${start}&end=${end}`);
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

  getProchaineDisponibilite: async (id_rh, date_depart) => {
    const response = await fetch(`${API_URL}/prochaine_disponibilite/rh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_rh, date_depart })
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
