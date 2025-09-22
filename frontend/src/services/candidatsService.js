import { api } from './api';

const candidatsService = {
  /**
   * Créer une candidature
   * @param {Object} candidatureData - Données de la candidature
   * @param {string} recaptchaToken - Token reCAPTCHA (optionnel)
   * @returns {Promise} Résultat de la création
   */
  async createCandidat(candidatureData, recaptchaToken = null) {
    try {
      // Préparer les données pour l'API backend
      const apiData = this.formatDataForAPI(candidatureData);
      
      // Ajouter le token reCAPTCHA s'il est fourni
      if (recaptchaToken) {
        apiData.recaptchaToken = recaptchaToken;
      }
      
      // Debug des données envoyées
      console.log('apiData keys:', Object.keys(apiData));
      console.log('apiData.photo:', apiData.photo);
      console.log('apiData.photo type:', typeof apiData.photo);
      console.log('apiData.photo instanceof File:', apiData.photo instanceof File);
      console.log('apiData.formations:', apiData.formations);
      console.log('apiData.langues:', apiData.langues);
      console.log('apiData.qualites:', apiData.qualites);
      console.log('apiData.experiences:', apiData.experiences);
      
      // Créer un FormData pour l'envoi avec fichier
      const formData = new FormData();
      
      // Ajouter tous les champs à FormData
      Object.keys(apiData).forEach(key => {
        if (key === 'photo' && apiData.photo instanceof File) {
          console.log('Ajout de la photo:', apiData.photo.name, apiData.photo.size, 'bytes');
          formData.append('photo', apiData.photo);
        } else if (typeof apiData[key] === 'object' && apiData[key] !== undefined) {
          formData.append(key, JSON.stringify(apiData[key]));
        } else if (apiData[key] !== undefined && apiData[key] !== '') {
          formData.append(key, apiData[key]);
        }
      });
      
      console.log('FormData keys:', [...formData.keys()]);
      
      const response = await api.post('/public/create/candidat', formData, {
        // Ne pas spécifier Content-Type, axios le détecte automatiquement pour FormData
        // headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000
      });

      console.log('Réponse du serveur:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la candidature:', error);
      console.error('Réponse complète du serveur:', error.response?.data);
      console.error('Détails reCAPTCHA:', error.response?.data?.details);
      console.error('Status:', error.response?.status);
      throw this.handleAPIError(error);
    }
  },

  /**
   * Formater les données du formulaire pour l'API backend
   * @param {Object} formData - Données du formulaire frontend
   * @returns {Object} Données formatées pour l'API
   */
  formatDataForAPI(formData) {
    return {
      // Données personnelles du tiers
      nom: formData.nom || '',
      prenom: formData.prenom || '',
      date_naissance: formData.date_naissance || '',
      genre: formData.genre || '', // Passer la valeur, le backend résoudra l'ID
      situation_matrimoniale: this.resolveSituationMatrimoniale(formData.situation_matrimoniale),
      nombre_enfants: parseInt(formData.nombre_enfants) || 0,
      contact: formData.telephone || '',
      email: formData.email || '',
      cin: formData.cin || '',
      ville: formData.ville || '', // Passer la valeur, le backend résoudra l'ID
      photo: formData.photo,
      
      // Relations du candidat
      formations: this.formatFormations(formData.formations || []),
      langues: this.formatRelationArray(formData.langues || []),
      qualites: this.formatRelationArray(formData.qualites || []),
      experiences: this.formatExperiences(formData.experiences || []),
      
      // Données spécifiques au candidat
      annonce_id: parseInt(formData.annonce_id) || 0,
      cv: formData.cv || 'CV généré automatiquement'
    };
  },

  /**
   * Résoudre la situation matrimoniale
   */
  resolveSituationMatrimoniale(situation) {
    if (!situation) return '';
    
    // Si c'est une string simple, la retourner
    if (typeof situation === 'string') {
      return situation;
    }
    
    // Si c'est un objet avec value/label/valeur
    if (typeof situation === 'object') {
      return situation.value || situation.label || situation.valeur || '';
    }
    
    return '';
  },

  /**
   * Formater les formations pour l'API
   */
  formatFormations(formations) {
    return formations.map(formation => ({
      id_filiere: this.resolveId(formation.filiere),
      id_niveau: this.resolveId(formation.niveau),
      etablissement: formation.etablissement || '',
      annee_obtention: formation.annee || ''
    }));
  },

  /**
   * Formater les expériences pour l'API backend
   */
  formatExperiences(experiences) {
    return experiences.map(exp => ({
      id_domaine: exp.id_domaine,
      date_debut: exp.date_debut || '',
      date_fin: exp.date_fin,
      description_taches: exp.description_taches || exp.description || ''
    }));
  },

  /**
   * Formater un tableau de relations (langues, qualités)
   */
  formatRelationArray(items) {
    return items.map(item => {
      if (typeof item === 'string') {
        return { valeur: item };
      }
      if (typeof item === 'object') {
        // Si l'item a une propriété 'langue', 'qualite', etc. qui contient l'ID
        if (item.langue || item.qualite) {
          return { valeur: item.langue || item.qualite };
        }
        return {
          id: item.id,
          valeur: item.valeur || item
        };
      }
      return { valeur: item };
    });
  },

  /**
   * Résoudre un ID (utilitaire générique)
   */
  resolveId(item) {
    if (typeof item === 'number') return item;
    if (typeof item === 'string' && !isNaN(item)) return parseInt(item);
    if (typeof item === 'object' && item?.id) return item.id;
    if (typeof item === 'object' && item?.value) return item.value;
    return undefined;
  },

  /**
   * Gérer les erreurs de l'API
   */
  handleAPIError(error) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      if (status === 400) {
        return new Error(data.message || 'Données invalides');
      } else if (status === 409) {
        return new Error(data.message || 'Candidature déjà existante');
      } else if (status === 413) {
        return new Error('Le fichier photo est trop volumineux');
      } else if (status >= 500) {
        return new Error('Erreur serveur. Veuillez réessayer plus tard.');
      }
      
      return new Error(data.message || `Erreur ${status}`);
    } else if (error.request) {
      return new Error('Impossible de se connecter au serveur');
    } else {
      return new Error(error.message || 'Erreur inconnue');
    }
  }
};

export default candidatsService;