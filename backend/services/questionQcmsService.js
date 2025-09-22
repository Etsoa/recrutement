const QuestionQcm = require('../models/questionQcmsModel');
const ReponseQcm = require('../models/reponseQcmsModel');
const QcmAnnonce = require('../models/qcmAnnoncesModel');

/**
 * Récupérer toutes les questions QCM associées à une annonce
 * @param {number} id_annonce - L'ID de l'annonce
 * @returns {Array} Liste des questions avec leurs réponses
 */
async function getQuestionsByAnnonce(id_annonce) {
  try {
    console.log('Récupération des questions pour l\'annonce:', id_annonce);
    
    // Récupérer les QCM liés à cette annonce
    const qcmAnnonces = await QcmAnnonce.findAll({
      where: { id_annonce },
      include: [
        {
          model: QuestionQcm,
          include: [
            {
              model: ReponseQcm,
              attributes: ['id_reponse_qcm', 'reponse'] // Retirer 'valeur' qui n'existe pas
            }
          ]
        }
      ]
    });
    
    if (!qcmAnnonces.length) {
      console.log('Aucun QCM trouvé pour cette annonce');
      return [];
    }
    
    // Formater les données pour le frontend
    const questions = qcmAnnonces.map(qcmAnnonce => {
      const question = qcmAnnonce.QuestionQcm;
      
      return {
        id_question: question.id_question_qcm,
        question: question.intitule,
        reponses: question.ReponseQcms.map(reponse => ({
          id: reponse.id_reponse_qcm,
          texte: reponse.reponse,
          // Ne pas exposer la bonne réponse côté frontend
          // modalite: reponse.modalite
        }))
      };
    });
    
    console.log(`${questions.length} questions trouvées`);
    return questions;
    
  } catch (error) {
    console.error('Erreur lors de la récupération des questions:', error);
    throw error;
  }
}

/**
 * Vérifier si une réponse est correcte
 * @param {number} id_reponse - L'ID de la réponse sélectionnée
 * @returns {boolean} True si la réponse est correcte
 */
async function verifyReponse(id_reponse) {
  try {
    const reponse = await ReponseQcm.findByPk(id_reponse);
    return reponse ? reponse.modalite : false; // Utiliser modalite, pas valeur
  } catch (error) {
    console.error('Erreur lors de la vérification de la réponse:', error);
    return false;
  }
}

/**
 * Compter le nombre total de bonnes réponses possibles pour une annonce
 * @param {number} id_annonce - L'ID de l'annonce
 * @returns {number} Nombre total de bonnes réponses possibles
 */
async function countTotalCorrectAnswers(id_annonce) {
  try {
    console.log('Comptage des bonnes réponses possibles pour l\'annonce:', id_annonce);
    
    // Récupérer les QCM liés à cette annonce avec les bonnes réponses
    const qcmAnnonces = await QcmAnnonce.findAll({
      where: { id_annonce },
      include: [
        {
          model: QuestionQcm,
          include: [
            {
              model: ReponseQcm,
              where: { modalite: true }, // Seulement les bonnes réponses
              attributes: ['id_reponse_qcm']
            }
          ]
        }
      ]
    });
    
    let totalBonnesReponses = 0;
    
    qcmAnnonces.forEach(qcmAnnonce => {
      const question = qcmAnnonce.QuestionQcm;
      if (question && question.ReponseQcms) {
        totalBonnesReponses += question.ReponseQcms.length;
      }
    });
    
    console.log(`Total des bonnes réponses possibles: ${totalBonnesReponses}`);
    return totalBonnesReponses;
    
  } catch (error) {
    console.error('Erreur lors du comptage des bonnes réponses:', error);
    return 0;
  }
}

module.exports = {
  getQuestionsByAnnonce,
  verifyReponse,
  countTotalCorrectAnswers
};