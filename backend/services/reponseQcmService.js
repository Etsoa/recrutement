const ReponseQcmCandidat = require('../models/reponseQcmCandidatsModel');
const QcmAnnonce = require('../models/qcmAnnoncesModel');
const EnvoiQcmCandidat = require('../models/envoiQcmCandidatsModel');

class ReponseQcmService {
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

  async createMultipleReponses(reponsesData, idEnvoiQcmCandidat) {
    try {
      const reponses = reponsesData.map(reponse => ({
        ...reponse,
        id_envoi_qcm_candidat: idEnvoiQcmCandidat
      }));

      await ReponseQcmCandidat.bulkCreate(reponses);
      return true;
    } catch (error) {
      console.error('Erreur lors de la création des réponses:', error);
      return false;
    }
  }

  async calculateQcmStats(idEnvoiQcmCandidat, idAnnonce) {
    try {
      // Récupérer toutes les réponses du candidat
      const reponsesCandidat = await ReponseQcmCandidat.findAll({
        where: { id_envoi_qcm_candidat: idEnvoiQcmCandidat },
        include: [{
          model: QcmAnnonce,
          where: { id_annonce: idAnnonce }
        }]
      });

      const totalQuestions = reponsesCandidat.length;
      const bonnesReponses = reponsesCandidat.filter(reponse => reponse.est_correcte).length;
      const score = totalQuestions > 0 ? Math.round((bonnesReponses / totalQuestions) * 20) : 0;

      return {
        totalQuestions,
        bonnesReponses,
        score
      };
    } catch (error) {
      console.error('Erreur lors du calcul des statistiques:', error);
      return {
        totalQuestions: 0,
        bonnesReponses: 0,
        score: 0
      };
    }
  }
}

module.exports = new ReponseQcmService();