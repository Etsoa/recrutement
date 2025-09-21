// services/ficheCandidatService.js - Service pour la gestion des candidats
import { api } from './api';

const CANDIDAT_ENDPOINTS = {
  DETAILS: '/unite/candidat'
};

export const ficheCandidatService = {
  // Récupérer le dossier complet d'un candidat
  getCandidatById: async (idCandidat) => {
    try {
      const response = await api.get(CANDIDAT_ENDPOINTS.DETAILS, {
        id: idCandidat
      });
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération du dossier candidat:', error);
      throw error;
    }
  },

  // Calculer l'âge à partir de la date de naissance
  calculateAge: (dateNaissance) => {
    if (!dateNaissance) return null;
    const today = new Date();
    const birthDate = new Date(dateNaissance);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  },

  // Formater la date au format français
  formatDate: (dateString) => {
    if (!dateString) return 'Non renseigné';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  },

  // Calculer la durée d'une expérience
  calculateExperienceDuration: (dateDebut, dateFin) => {
    if (!dateDebut) return 'Non renseigné';
    
    const startDate = new Date(dateDebut);
    const endDate = dateFin ? new Date(dateFin) : new Date();
    
    const diffInMs = endDate - startDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);
    
    if (diffInYears > 0) {
      const remainingMonths = diffInMonths % 12;
      return `${diffInYears} an${diffInYears > 1 ? 's' : ''}${remainingMonths > 0 ? ` et ${remainingMonths} mois` : ''}`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths} mois`;
    } else {
      return 'Moins d\'un mois';
    }
  },

  // Déterminer le statut d'un QCM pour un candidat
  getQcmStatus: (envoiQcm, reponseQcm) => {
    if (!envoiQcm || !Array.isArray(envoiQcm) || envoiQcm.length === 0) {
      return { type: 'not_sent', text: 'QCM non envoyé', action: 'send' };
    }
    
    if (!reponseQcm || !Array.isArray(reponseQcm) || reponseQcm.length === 0) {
      const dateEnvoi = envoiQcm[0]?.date_envoi;
      if (!dateEnvoi) {
        return { type: 'not_sent', text: 'QCM non envoyé', action: 'send' };
      }
      return { 
        type: 'sent', 
        text: `Envoyé le ${ficheCandidatService.formatDate(dateEnvoi)}`, 
        action: 'waiting' 
      };
    }
    
    const score = reponseQcm[0]?.score;
    const duree = reponseQcm[0]?.duree;
    return { 
      type: 'completed', 
      text: `Score: ${score || 0}/100 (${duree || 0}min)`, 
      action: 'completed' 
    };
  },

  // Déterminer le statut d'un entretien pour un candidat
  getEntretienStatus: (uniteEntretiens) => {
    if (!uniteEntretiens || !Array.isArray(uniteEntretiens) || uniteEntretiens.length === 0) {
      return { type: 'not_scheduled', text: 'Entretien non planifié', action: 'schedule' };
    }
    
    const entretien = uniteEntretiens[0];
    if (!entretien?.unite_entretien?.date_entretien) {
      return { type: 'not_scheduled', text: 'Entretien non planifié', action: 'schedule' };
    }
    
    const dateEntretien = new Date(entretien.unite_entretien.date_entretien);
    const today = new Date();
    
    // Si l'entretien a un score, il est terminé
    if (entretien.scores && Array.isArray(entretien.scores) && entretien.scores.length > 0) {
      const score = entretien.scores[0]?.score;
      return { 
        type: 'completed', 
        text: `Score: ${score || 0}/100`, 
        action: 'completed' 
      };
    }
    
    // Si l'entretien est dans le futur, il est planifié
    if (dateEntretien > today) {
      return { 
        type: 'scheduled', 
        text: `Planifié le ${ficheCandidatService.formatDate(dateEntretien)}`, 
        action: 'scheduled' 
      };
    }
    
    // Si l'entretien est passé sans score, il est en attente de score
    return { 
      type: 'waiting_score', 
      text: `En attente de notation`, 
      action: 'waiting' 
    };
  }
};

export default ficheCandidatService;