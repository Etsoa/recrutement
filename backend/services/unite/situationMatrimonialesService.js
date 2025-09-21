const SituationMatrimonialesModel = require('../../models/situationMatrimonialesModel');

class SituationMatrimonialesService {
  async getAllSituationMatrimoniales() {
    try {
      return await SituationMatrimonialesModel.getAll();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des situations matrimoniales : ${error.message}`);
    }
  }

  async getSituationMatrimonialeById(id) {
    try {
      return await SituationMatrimonialesModel.getById(id);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de la situation matrimoniale : ${error.message}`);
    }
  }

  async createSituationMatrimoniale(data) {
    try {
      return await SituationMatrimonialesModel.create(data);
    } catch (error) {
      throw new Error(`Erreur lors de la création de la situation matrimoniale : ${error.message}`);
    }
  }

  async updateSituationMatrimoniale(id, data) {
    try {
      return await SituationMatrimonialesModel.update(id, data);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de la situation matrimoniale : ${error.message}`);
    }
  }

  async deleteSituationMatrimoniale(id) {
    try {
      return await SituationMatrimonialesModel.delete(id);
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de la situation matrimoniale : ${error.message}`);
    }
  }
}

module.exports = new SituationMatrimonialesService();