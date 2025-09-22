// services/qcmService.js - Service spécifique pour la gestion des QCM
import { api } from './api';

export const qcmService = {
  /**
   * Récupère les données QCM pour une annonce donnée
   * @param {number} annonceId - L'ID de l'annonce
   * @returns {Promise} Les données du QCM avec structure { success, data, message }
   */
  async getQcmByAnnonce(annonceId) {
    try {
      const response = await api.get(`/public/qcm/annonce/${annonceId}`);
      // L'API retourne déjà la structure { success, data, message }
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération du QCM:', error);
      return {
        success: false,
        data: null,
        message: error.message || 'Impossible de charger le QCM'
      };
    }
  },

  /**
   * Soumet les réponses du QCM
   * @param {string} token - Le token du candidat
   * @param {Object} answers - Les réponses du candidat
   * @param {number} duration - La durée du QCM en secondes
   * @returns {Promise} Le résultat de la soumission avec structure { success, data, message }
   */
  async submitQcmResponses(token, answers, duration) {
    try {
      const response = await api.post('/public/qcm/reponses', {
        token,
        reponses: answers,
        duree: duration
      });
      // L'API retourne déjà la structure { success, data, message }
      return response;
    } catch (error) {
      console.error('Erreur lors de la soumission des réponses QCM:', error);
      return {
        success: false,
        data: null,
        message: error.message || 'Impossible de soumettre les réponses'
      };
    }
  },

  /**
   * Récupère les questions QCM avec un token spécifique
   * @param {string} token - Le token du candidat
   * @returns {Promise} Les questions QCM avec structure { success, data, message }
   */
  async getQcmQuestions(token) {
    try {
      const response = await api.post('/public/qcm/questions', { token });
      // L'API retourne déjà la structure { success, data, message }
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des questions QCM:', error);
      return {
        success: false,
        data: null,
        message: error.message || 'Impossible de charger les questions QCM'
      };
    }
  },

  /**
   * Récupère le QCM complet en décomposant le token pour obtenir les infos candidat/annonce
   * @param {string} token - Le token JWT du candidat
   * @returns {Promise} QCM complet avec infos candidat et questions { success, data, message }
   */
  async getQcmWithToken(token) {
    try {
      const response = await api.post('/public/qcm/questions', { token });
      
      if (!response.success) {
        return response;
      }

      // Les données contiennent déjà les informations décodées du token
      const { data } = response;
      
      // Récupérer les questions formatées pour l'annonce
      const qcmResponse = await this.getQcmByAnnonce(data.id_annonce || 1);
      
      if (!qcmResponse.success) {
        return qcmResponse;
      }

      // Fusionner les données du token avec les questions QCM
      const completeQcmData = {
        // Informations du token décodé
        id_envoi_qcm_candidat: data.id_envoi_qcm_candidat,
        id_candidat: data.candidat?.id_candidat || null,
        id_annonce: data.id_annonce || null,
        
        // Informations du candidat
        candidat: {
          nom: data.candidat?.nom,
          prenom: data.candidat?.prenom,
          poste: data.candidat?.poste
        },
        
        // Informations du QCM (titre, durée, questions)
        qcm: {
          id: qcmResponse.data.id,
          titre: qcmResponse.data.titre,
          duree_par_question: qcmResponse.data.duree_par_question,
          questions: qcmResponse.data.questions || []
        },
        
        // Métadonnées
        debut_qcm: data.debut_qcm,
        token_valide: true
      };

      return {
        success: true,
        data: completeQcmData,
        message: 'QCM récupéré avec succès'
      };
      
    } catch (error) {
      console.error('Erreur lors de la récupération du QCM avec token:', error);
      return {
        success: false,
        data: null,
        message: error.message || 'Impossible de charger le QCM avec ce token'
      };
    }
  }
};