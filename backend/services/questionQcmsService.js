const QuestionQcm = require('../models/questionQcmsModel');
const ReponseQcm = require('../models/reponseQcmsModel');
const QcmAnnonce = require('../models/qcmAnnoncesModel');

// Définir les associations ici pour éviter les références circulaires
QuestionQcm.hasMany(ReponseQcm, { 
  foreignKey: 'id_question_qcm', 
  sourceKey: 'id_question',
  as: 'reponses'
});
ReponseQcm.belongsTo(QuestionQcm, { 
  foreignKey: 'id_question_qcm',
  targetKey: 'id_question'
});

class QuestionQcmsService {
  async getQuestionsByAnnonce(idAnnonce) {
    try {
      const qcmAnnonces = await QcmAnnonce.findAll({
        where: { id_annonce: idAnnonce },
        attributes: ['id_question_qcm']
      });

      if (qcmAnnonces.length === 0) {
        return [];
      }

      const questionIds = qcmAnnonces.map(qa => qa.id_question_qcm);

      const questions = await QuestionQcm.findAll({
        where: {
          id_question: questionIds
        },
        include: [{
          model: ReponseQcm,
          attributes: ['id_reponse_qcm', 'reponse']
        }]
      });

      return questions;
    } catch (error) {
      console.error('Erreur lors de la récupération des questions:', error);
      return [];
    }
  }

  /**
   * Récupère toutes les questions QCM et leurs réponses pour une annonce donnée
   * @param {number} idAnnonce - L'ID de l'annonce
   * @returns {Array} Questions formatées avec leurs réponses
   */
  async getQcmCompletByAnnonce(idAnnonce) {
    try {
      // Étape 1: Récupérer les IDs des questions associées à l'annonce
      const qcmAnnonces = await QcmAnnonce.findAll({
        where: { id_annonce: idAnnonce },
        attributes: ['id_question_qcm']
      });

      if (qcmAnnonces.length === 0) {
        return {
          id: idAnnonce,
          titre: `QCM pour l'annonce ${idAnnonce}`,
          duree_par_question: 30, // Durée par défaut en secondes
          questions: []
        };
      }

      const questionIds = qcmAnnonces.map(qa => qa.id_question_qcm);

      // Étape 2: Récupérer les questions avec leurs réponses
      const questions = await QuestionQcm.findAll({
        where: {
          id_question: questionIds
        },
        include: [{
          model: ReponseQcm,
          attributes: ['id_reponse_qcm', 'reponse', 'modalite'],
          as: 'reponses'
        }],
        attributes: ['id_question', 'intitule'],
        order: [['id_question', 'ASC']]
      });

      // Étape 3: Formater les données pour le frontend
      const questionsFormatees = questions.map(question => {
        const reponses = question.reponses ? question.reponses.map((reponse, index) => ({
          id: String.fromCharCode(97 + index), // a, b, c, d...
          id_reponse: reponse.id_reponse_qcm,
          texte: reponse.reponse,
          valeur: reponse.modalite // true si c'est la bonne réponse
        })) : [];

        return {
          id: question.id_question,
          question: question.intitule,
          reponses: reponses
        };
      });

      return {
        id: idAnnonce,
        titre: `QCM pour l'annonce ${idAnnonce}`,
        duree_par_question: 30, // Durée par défaut en secondes
        questions: questionsFormatees
      };

    } catch (error) {
      console.error('Erreur lors de la récupération du QCM complet:', error);
      throw new Error('Erreur lors de la récupération des questions QCM');
    }
  }

  async verifyReponse(idReponseQcm) {
    try {
      const reponse = await ReponseQcm.findByPk(idReponseQcm);
      
      if (!reponse) {
        return false;
      }
      
      return reponse.modalite;
    } catch (error) {
      console.error('Erreur lors de la vérification de la réponse:', error);
      return false;
    }
  }

  async getQcmAnnonceByQuestion(idQuestion, idAnnonce) {
    try {
      const qcmAnnonce = await QcmAnnonce.findOne({
        where: { 
          id_question_qcm: idQuestion,
          id_annonce: idAnnonce
        }
      });
      
      return qcmAnnonce ? qcmAnnonce.id_qcm_annonce : null;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'ID QCM annonce:', error);
      return null;
    }
  }
}

module.exports = new QuestionQcmsService();
