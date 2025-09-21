const RhEntretiensModel = require('../../models/rhEntretiensModel');
const UniteEntretiensModel = require('../../models/uniteEntretiensModel');
const StatusUniteEntretiensModel = require('../../models/statusUniteEntretiensModel');
const ScoreUniteEntretiensModel = require('../../models/scoreUniteEntretiensModel');

class EntretiensService {
  // Entretiens RH
  async getAllRhEntretiens() {
    try {
      return await RhEntretiensModel.getAll();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des entretiens RH : ${error.message}`);
    }
  }

  async getRhEntretienById(id) {
    try {
      return await RhEntretiensModel.getById(id);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'entretien RH : ${error.message}`);
    }
  }

  async createRhEntretien(data) {
    try {
      return await RhEntretiensModel.create(data);
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'entretien RH : ${error.message}`);
    }
  }

  async updateRhEntretien(id, data) {
    try {
      return await RhEntretiensModel.update(id, data);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'entretien RH : ${error.message}`);
    }
  }

  // Entretiens Unité
  async getAllUniteEntretiens() {
    try {
      return await UniteEntretiensModel.getAll();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des entretiens unité : ${error.message}`);
    }
  }

  async getUniteEntretienById(id) {
    try {
      return await UniteEntretiensModel.getById(id);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'entretien unité : ${error.message}`);
    }
  }

  async createUniteEntretien(data) {
    try {
      return await UniteEntretiensModel.create(data);
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'entretien unité : ${error.message}`);
    }
  }

  async updateUniteEntretien(id, data) {
    try {
      return await UniteEntretiensModel.update(id, data);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'entretien unité : ${error.message}`);
    }
  }

  // Méthodes utilitaires
  async getEntretiensByCandidat(candidatId) {
    try {
      const rhEntretiens = await RhEntretiensModel.getByCandidatId(candidatId);
      const uniteEntretiens = await UniteEntretiensModel.getByCandidatId(candidatId);
      return {
        rhEntretiens,
        uniteEntretiens
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des entretiens du candidat : ${error.message}`);
    }
  }

  async scheduleEntretien(candidatId, type, dateEntretien, data = {}) {
    try {
      const entretienData = {
        id_candidat: candidatId,
        date_entretien: dateEntretien,
        ...data
      };

      if (type === 'rh') {
        return await this.createRhEntretien(entretienData);
      } else if (type === 'unite') {
        return await this.createUniteEntretien(entretienData);
      } else {
        throw new Error('Type d\'entretien invalide. Utilisez "rh" ou "unite".');
      }
    } catch (error) {
      throw new Error(`Erreur lors de la planification de l'entretien : ${error.message}`);
    }
  }

  // Nouvelles méthodes pour les entretiens unité
  async getUniteEntretiensByDate(date) {
    try {
      return await UniteEntretiensModel.getByDate(date);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des entretiens par date : ${error.message}`);
    }
  }

  async updateDateUniteEntretien(id, nouvelleDateé) {
    try {
      return await UniteEntretiensModel.updateDate(id, nouvelleDateé);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de la date d'entretien : ${error.message}`);
    }
  }

  async updateStatusUniteEntretien(idEntretien, idStatus) {
    try {
      return await StatusUniteEntretiensModel.updateStatus(idEntretien, idStatus);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du statut d'entretien : ${error.message}`);
    }
  }

  async createScoreUniteEntretien(scoreData) {
    try {
      return await ScoreUniteEntretiensModel.create(scoreData);
    } catch (error) {
      throw new Error(`Erreur lors de la création du score d'entretien : ${error.message}`);
    }
  }
}

module.exports = new EntretiensService();