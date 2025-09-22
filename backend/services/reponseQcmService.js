const ReponseQcmCandidat = require('../models/reponseQcmCandidatsModel');
const QcmAnnonce = require('../models/qcmAnnoncesModel');
const QuestionQcm = require('../models/questionQcmsModel');
const questionQcmsService = require('./questionQcmsService');

/**
 * Récupérer l'ID du QCM-Annonce basé sur une question et une annonce
 * @param {number} id_question - L'ID de la question
 * @param {number} id_annonce - L'ID de l'annonce
 * @returns {number} L'ID du QCM-Annonce
 */
async function getQcmAnnonceByQuestion(id_question, id_annonce) {
  try {
    const qcmAnnonce = await QcmAnnonce.findOne({
      where: { 
        id_annonce,
        id_question_qcm: id_question
      }
    });
    
    return qcmAnnonce ? qcmAnnonce.id_qcm_annonce : null;
  } catch (error) {
    console.error('Erreur lors de la recherche du QCM-Annonce:', error);
    throw error;
  }
}

/**
 * Créer plusieurs réponses QCM d'un candidat
 * Gère le cas où le token a déjà été marqué comme utilisé à l'ouverture
 * @param {Array} reponsesData - Tableau des données de réponses
 * @param {number} id_envoi_qcm_candidat - L'ID de l'envoi QCM
 * @returns {Array} Les réponses créées
 */
async function createMultipleReponses(reponsesData, id_envoi_qcm_candidat) {
  try {
    console.log('Soumission de', reponsesData.length, 'réponses QCM pour envoi:', id_envoi_qcm_candidat);
    
    // Vérifier s'il existe déjà une entrée "placeholder" créée à l'ouverture
    const existingPlaceholder = await ReponseQcmCandidat.findOne({
      where: { 
        id_envoi_qcm_candidat,
        id_qcm_annonce: null, // NULL indique un placeholder
        score: null // NULL indique un placeholder
      }
    });

    // Récupérer l'heure de début du QCM
    const debutQcm = existingPlaceholder ? existingPlaceholder.debut : new Date();
    const finQcm = new Date();
    const dureeQcm = Math.floor((finQcm - debutQcm) / 1000); // durée en secondes

    if (existingPlaceholder) {
      console.log('Suppression de l\'entrée placeholder et création des vraies réponses...');
      console.log('Début QCM:', debutQcm);
      console.log('Fin QCM:', finQcm);
      console.log('Durée QCM:', dureeQcm, 'secondes');
      
      // Supprimer l'entrée placeholder
      await ReponseQcmCandidat.destroy({
        where: { 
          id_envoi_qcm_candidat,
          id_qcm_annonce: null,
          score: null
        }
      });
    }

    // Ajouter les temps à chaque réponse
    const reponsesAvecTemps = reponsesData.map(reponse => ({
      ...reponse,
      debut: debutQcm,
      fin: finQcm,
      duree: dureeQcm
    }));

    // Créer les vraies réponses
    const reponses = await ReponseQcmCandidat.bulkCreate(reponsesAvecTemps);
    
    console.log('Réponses QCM finales créées avec succès');
    return reponses;
  } catch (error) {
    console.error('Erreur lors de la création des réponses:', error);
    throw error;
  }
}

/**
 * Calculer les statistiques du QCM pour un candidat
 * @param {number} id_envoi_qcm_candidat - L'ID de l'envoi QCM
 * @param {number} id_annonce - L'ID de l'annonce pour compter les bonnes réponses possibles
 * @returns {Object} Les statistiques du QCM
 */
async function calculateQcmStats(id_envoi_qcm_candidat, id_annonce) {
  try {
    console.log('Calcul des statistiques pour l\'envoi QCM:', id_envoi_qcm_candidat);
    
    // Récupérer toutes les réponses du candidat
    const reponses = await ReponseQcmCandidat.findAll({
      where: { id_envoi_qcm_candidat }
    });
    
    if (!reponses.length) {
      return {
        nombre_questions: 0,
        bonnes_reponses_trouvees: 0,
        bonnes_reponses_possibles: 0,
        score_total: 0,
        score_sur_20: 0,
        pourcentage: 0,
        duree_totale: 0,
        debut_qcm: null,
        fin_qcm: null
      };
    }
    
    // CALCUL DU SCORE : basé sur les bonnes réponses trouvées vs bonnes réponses possibles
    const nombre_questions = reponses.length;
    const bonnes_reponses_trouvees = reponses.reduce((sum, rep) => sum + (rep.score || 0), 0);
    
    // Compter le total de bonnes réponses possibles pour cette annonce
    const bonnes_reponses_possibles = await questionQcmsService.countTotalCorrectAnswers(id_annonce);
    
    // Nouvelle logique : score = (bonnes trouvées / bonnes possibles)
    const score_ratio = bonnes_reponses_possibles > 0 ? bonnes_reponses_trouvees / bonnes_reponses_possibles : 0;
    const score_sur_20 = Math.round(score_ratio * 20 * 100) / 100;
    const pourcentage = Math.round(score_ratio * 100 * 100) / 100;
    
    console.log(`Score détaillé: ${bonnes_reponses_trouvees}/${bonnes_reponses_possibles} = ${score_sur_20}/20`);
    
    // INFORMATIONS TEMPORELLES : indépendantes du score
    // Récupérer les temps du processus QCM (toutes les réponses ont les mêmes temps)
    const premiereReponse = reponses[0];
    const debut_qcm = premiereReponse.debut;
    const fin_qcm = premiereReponse.fin;
    const duree_totale = premiereReponse.duree; // durée totale en secondes
    
    const stats = {
      nombre_questions,
      bonnes_reponses_trouvees,
      bonnes_reponses_possibles,
      score_total: bonnes_reponses_trouvees, // Pour compatibilité
      score_sur_20,
      pourcentage,
      duree_totale,
      debut_qcm,
      fin_qcm,
      date_completion: new Date().toISOString()
    };
    
    console.log('Statistiques calculées:', stats);
    return stats;
    
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error);
    throw error;
  }
}

/**
 * Vérifier si un candidat a déjà complété un QCM
 * @param {number} id_envoi_qcm_candidat - L'ID de l'envoi QCM
 * @returns {boolean} True si le QCM est complété
 */
async function isQcmCompleted(id_envoi_qcm_candidat) {
  try {
    const reponseCount = await ReponseQcmCandidat.count({
      where: { id_envoi_qcm_candidat }
    });
    
    return reponseCount > 0;
  } catch (error) {
    console.error('Erreur lors de la vérification du QCM complété:', error);
    return false;
  }
}

module.exports = {
  getQcmAnnonceByQuestion,
  createMultipleReponses,
  calculateQcmStats,
  isQcmCompleted
};