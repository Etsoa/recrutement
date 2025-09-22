const RhSuggestionsModel = require('../../models/rhSuggestionsModel');
const CeoSuggestionsModel = require('../../models/ceoSuggestionsModel');

class SuggestionsService {
  // Suggestions RH
  async getAllRhSuggestions() {
    try {
      return await RhSuggestionsModel.findAll();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des suggestions RH : ${error.message}`);
    }
  }

  async getRhSuggestionById(id) {
    try {
      return await RhSuggestionsModel.getById(id);
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de la suggestion RH : ${error.message}`);
    }
  }

  async createRhSuggestion(data) {
    try {
      return await RhSuggestionsModel.create(data);
    } catch (error) {
      throw new Error(`Erreur lors de la création de la suggestion RH : ${error.message}`);
    }
  }

  async updateRhSuggestion(id, data) {
    try {
      return await RhSuggestionsModel.update(id, data);
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de la suggestion RH : ${error.message}`);
    }
  }

  // Suggestions CEO
  async getAllCeoSuggestions() {
    try {
      return await CeoSuggestionsModel.getAll();
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des suggestions CEO : ${error.message}`);
    }
  }

  async createCeoSuggestion(data) {
    try {
      return await CeoSuggestionsModel.create(data);
    } catch (error) {
      throw new Error(`Erreur lors de la création de la suggestion CEO : ${error.message}`);
    }
  }

  // Méthodes utilitaires
  async suggestToRh(suggestionData) {
    try {
      const suggestion = {
        id_candidat: suggestionData.id_candidat,
        id_unite: suggestionData.id_unite,
        commentaire: suggestionData.commentaire || '',
        date_suggestion: new Date(),
        statut: 1, // En attente
        ...suggestionData
      };
      
      return await this.createRhSuggestion(suggestion);
    } catch (error) {
      throw new Error(`Erreur lors de l'envoi de la suggestion à la RH : ${error.message}`);
    }
  }

  async suggestToCeo(suggestionData) {
    try {
      const suggestion = {
        id_candidat: suggestionData.id_candidat,
        id_unite: suggestionData.id_unite,
        commentaire: suggestionData.commentaire || '',
        date_suggestion: new Date(),
        statut: 1, // En attente
        ...suggestionData
      };
      
      return await this.createCeoSuggestion(suggestion);
    } catch (error) {
      throw new Error(`Erreur lors de l'envoi de la suggestion au CEO : ${error.message}`);
    }
  }

  async getSuggestionsByCandidat(candidatId) {
    try {
      const rhSuggestions = await RhSuggestionsModel.getByCandidatId(candidatId);
      const ceoSuggestions = await CeoSuggestionsModel.getByCandidatId(candidatId);
      
      return {
        rhSuggestions,
        ceoSuggestions
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des suggestions du candidat : ${error.message}`);
    }
  }

  async getSuggestionsByUnite(uniteId) {
    try {
      const rhSuggestions = await RhSuggestionsModel.getByUniteId(uniteId);
      const ceoSuggestions = await CeoSuggestionsModel.getByUniteId(uniteId);
      
      return {
        rhSuggestions,
        ceoSuggestions
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des suggestions de l'unité : ${error.message}`);
    }
  }
}

module.exports = new SuggestionsService();