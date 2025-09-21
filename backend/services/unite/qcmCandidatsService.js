const EnvoiQcmCandidatsModel = require('../../models/envoiQcmCandidatsModel');
const ReponseQcmCandidatsModel = require('../../models/reponseQcmCandidatsModel');

class QcmCandidatsService {
  // Envoi de QCM aux candidats
  async getAllEnvoiQcm() {
    try {
      return await EnvoiQcmCandidatsModel.getAll();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des envois de QCM : ${error.message}`);
    }
  }

  async getEnvoiQcmById(id) {
    try {
      return await EnvoiQcmCandidatsModel.getById(id);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'envoi de QCM : ${error.message}`);
    }
  }

  async createQcmCandidat(data) {
    try {
      const qcmData = {
        id_candidat: data.id_candidat,
        id_qcm: data.id_qcm,
        date_envoi: new Date(),
        date_limite: data.date_limite || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours par défaut
        statut: 1, // Envoyé
        ...data
      };
      
      return await EnvoiQcmCandidatsModel.create(qcmData);
    } catch (error) {
      throw new Error(`Erreur lors de la création du QCM candidat : ${error.message}`);
    }
  }

  async updateQcmCandidat(id, data) {
    try {
      return await EnvoiQcmCandidatsModel.update(id, data);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du QCM candidat : ${error.message}`);
    }
  }

  // Réponses des candidats aux QCM
  async getReponsesByCandidat(candidatId) {
    try {
      return await ReponseQcmCandidatsModel.getByCandidatId(candidatId);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des réponses du candidat : ${error.message}`);
    }
  }

  async getReponsesByQcm(qcmId) {
    try {
      return await ReponseQcmCandidatsModel.getByQcmId(qcmId);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des réponses du QCM : ${error.message}`);
    }
  }

  async createReponseCandidat(data) {
    try {
      return await ReponseQcmCandidatsModel.create(data);
    } catch (error) {
      throw new Error(`Erreur lors de la création de la réponse candidat : ${error.message}`);
    }
  }

  // Méthodes utilitaires
  async getQcmStatutByCandidat(candidatId) {
    try {
      const envoi = await EnvoiQcmCandidatsModel.getByCandidatId(candidatId);
      const reponses = await ReponseQcmCandidatsModel.getByCandidatId(candidatId);
      
      return {
        envoi,
        reponses,
        statut: envoi ? (reponses && reponses.length > 0 ? 'completed' : 'sent') : 'not_sent'
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du statut QCM : ${error.message}`);
    }
  }

  async calculerScoreQcm(candidatId, qcmId) {
    try {
      const reponses = await ReponseQcmCandidatsModel.getReponsesByQcmAndCandidat(candidatId, qcmId);
      
      if (!reponses || reponses.length === 0) {
        return { score: 0, total: 0, pourcentage: 0 };
      }

      const bonnesReponses = reponses.filter(reponse => reponse.est_correcte === true);
      const score = bonnesReponses.length;
      const total = reponses.length;
      const pourcentage = Math.round((score / total) * 100);

      return {
        score,
        total,
        pourcentage
      };
    } catch (error) {
      throw new Error(`Erreur lors du calcul du score QCM : ${error.message}`);
    }
  }

  async getQcmsByDateLimite(date) {
    try {
      return await EnvoiQcmCandidatsModel.getByDateLimite(date);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des QCM par date limite : ${error.message}`);
    }
  }
}

module.exports = new QcmCandidatsService();