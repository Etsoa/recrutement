/**
 * Service pour gérer les fonctionnalités CEO
 */

export const ceoService = {
  // Vérifier l'authentification
  isLoggedIn: () => {
    return !!localStorage.getItem('ceoToken');
  },
  
  // Déconnecter le CEO
  logout: () => {
    localStorage.removeItem('ceoToken');
  },
  
  // Récupérer le token 
  getToken: () => {
    return localStorage.getItem('ceoToken');
  },
  
  // Récupérer tous les employés
  getAllEmployes: async () => {
    try {
      const response = await fetch('http://localhost:5000/api/ceo/employes', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('ceoToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur getAllEmployes:', error);
      return { success: false, message: error.message, data: [] };
    }
  },
  
  // Récupérer les détails d'un employé
  getEmployeDetails: async (employeId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/ceo/employes/${employeId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('ceoToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur getEmployeDetails:', error);
      return { success: false, message: error.message, data: null };
    }
  },
  
  // Récupérer toutes les suggestions
  getAllSuggestions: async () => {
    try {
      const response = await fetch('http://localhost:5000/api/ceo/suggestions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('ceoToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur getAllSuggestions:', error);
      return { success: false, message: error.message, data: [] };
    }
  },
  
  // Récupérer les suggestions en attente
  getSuggestionsEnAttente: async () => {
    try {
      const response = await fetch('http://localhost:5000/api/ceo/suggestions-waiting', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('ceoToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des suggestions en attente');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur getSuggestionsEnAttente:', error);
      throw error;
    }
  },

  // Accepter une suggestion
  accepterSuggestion: async (suggestionId) => {
    try {
      const response = await fetch('http://localhost:5000/api/ceo/validate-suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('ceoToken')}`
        },
        body: JSON.stringify({ id_suggestion: suggestionId })
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la validation de la suggestion');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur accepterSuggestion:', error);
      throw error;
    }
  },

  // Refuser une suggestion
  refuserSuggestion: async (suggestionId) => {
    try {
      const response = await fetch('http://localhost:5000/api/ceo/reject-suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('ceoToken')}`
        },
        body: JSON.stringify({ id_suggestion: suggestionId })
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors du rejet de la suggestion');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur refuserSuggestion:', error);
      throw error;
    }
  },

  // Obtenir les employés en contrat d'essai
  getEmpEnContratDEssai: async () => {
    try {
      const response = await fetch('http://localhost:5000/api/ceo/emp-contrat-essai', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('ceoToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur getEmpEnContratDEssai:', error);
      return { success: false, message: error.message, data: [] };
    }
  },

  // Renouveler un contrat
  renewContract: async (contratId, dureeRenouvelement) => {
    try {
      const response = await fetch('http://localhost:5000/api/ceo/renouveler-contrat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('ceoToken')}`
        },
        body: JSON.stringify({ id_contrat: contratId, duree_mois: dureeRenouvelement })
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors du renouvellement du contrat');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur renewContract:', error);
      throw error;
    }
  }
};

export default ceoService;
