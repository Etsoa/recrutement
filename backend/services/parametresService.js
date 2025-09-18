const db = require('../config/db');
const DelaiEntretien = require('../models/delaiEntretienModel');
const DelaiQcm = require('../models/delaiQcmModel');
const PourcentageMinimumCv = require('../models/pourcentageMinimumCvModel');
const ScoreMinimumQcm = require('../models/scoreMinimumQcmModel');
const ScoreMinimumEntretien = require('../models/scoreMinimumEntretienModel.js');

// ===== DELAI ENTRETIEN =====

// Récupérer la valeur actuelle du délai entretien
const getDelaiEntretien = async () => {
    try {
        const delai = await DelaiEntretien.findOne();
        return delai ? delai.valeur : null;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération du délai entretien: ${error.message}`);
    }
};

// Mettre à jour le délai entretien
const updateDelaiEntretien = async (nouvelleValeur) => {
    try {
        // Supprimer l'ancienne valeur
        await DelaiEntretien.destroy({ where: {} });
        
        // Créer la nouvelle valeur
        const nouveauDelai = await DelaiEntretien.create({ valeur: nouvelleValeur });
        return nouveauDelai;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour du délai entretien: ${error.message}`);
    }
};

// ===== DELAI QCM =====

// Récupérer la valeur actuelle du délai QCM
const getDelaiQcm = async () => {
    try {
        const delai = await DelaiQcm.findOne();
        return delai ? delai.valeur : null;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération du délai QCM: ${error.message}`);
    }
};

// Mettre à jour le délai QCM
const updateDelaiQcm = async (nouvelleValeur) => {
    try {
        // Supprimer l'ancienne valeur
        await DelaiQcm.destroy({ where: {} });
        
        // Créer la nouvelle valeur
        const nouveauDelai = await DelaiQcm.create({ valeur: nouvelleValeur });
        return nouveauDelai;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour du délai QCM: ${error.message}`);
    }
};

// ===== POURCENTAGE MINIMUM CV =====

// Récupérer la valeur actuelle du pourcentage minimum CV
const getPourcentageMinimumCv = async () => {
    try {
        const pourcentage = await PourcentageMinimumCv.findOne();
        return pourcentage ? pourcentage.valeur : null;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération du pourcentage minimum CV: ${error.message}`);
    }
};

// Mettre à jour le pourcentage minimum CV
const updatePourcentageMinimumCv = async (nouvelleValeur) => {
    try {
        // Valider que la valeur est entre 0 et 100
        if (nouvelleValeur < 0 || nouvelleValeur > 100) {
            throw new Error('Le pourcentage doit être entre 0 et 100');
        }
        
        // Supprimer l'ancienne valeur
        await PourcentageMinimumCv.destroy({ where: {} });
        
        // Créer la nouvelle valeur
        const nouveauPourcentage = await PourcentageMinimumCv.create({ valeur: nouvelleValeur });
        return nouveauPourcentage;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour du pourcentage minimum CV: ${error.message}`);
    }
};

// ===== SCORE MINIMUM QCM =====

// Récupérer la valeur actuelle du score minimum QCM
const getScoreMinimumQcm = async () => {
    try {
        const score = await ScoreMinimumQcm.findOne();
        return score ? score.valeur : null;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération du score minimum QCM: ${error.message}`);
    }
};

// Mettre à jour le score minimum QCM
const updateScoreMinimumQcm = async (nouvelleValeur) => {
    try {
        // Valider que la valeur est positive
        if (nouvelleValeur < 0) {
            throw new Error('Le score doit être positif');
        }
        
        // Supprimer l'ancienne valeur
        await ScoreMinimumQcm.destroy({ where: {} });
        
        // Créer la nouvelle valeur
        const nouveauScore = await ScoreMinimumQcm.create({ valeur: nouvelleValeur });
        return nouveauScore;
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour du score minimum QCM: ${error.message}`);
    }
};

// ===== SCORE MINIMUM ENTRETIEN =====

// Récupérer tous les scores minimum entretien
const getScoreMinimumEntretien = async () => {
    try {
        const scores = await ScoreMinimumEntretien.findAll({
            order: [['id_score_minimum_entretien', 'ASC']]
        });
        return scores;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des scores minimum entretien: ${error.message}`);
    }
};

// Récupérer un score minimum entretien par ID
const getScoreMinimumEntretienById = async (id) => {
    try {
        const score = await ScoreMinimumEntretien.findByPk(id);
        return score;
    } catch (error) {
        throw new Error(`Erreur lors de la récupération du score minimum entretien: ${error.message}`);
    }
};

// Créer un nouveau score minimum entretien
const createScoreMinimumEntretien = async (valeur) => {
    try {
        // Valider que la valeur est positive
        if (valeur < 0) {
            throw new Error('Le score doit être positif');
        }
        
        const nouveauScore = await ScoreMinimumEntretien.create({ valeur });
        return nouveauScore;
    } catch (error) {
        throw new Error(`Erreur lors de la création du score minimum entretien: ${error.message}`);
    }
};

// Mettre à jour un score minimum entretien
const updateScoreMinimumEntretien = async (id, valeur) => {
    try {
        // Valider que la valeur est positive
        if (valeur < 0) {
            throw new Error('Le score doit être positif');
        }
        
        const [nbUpdated] = await ScoreMinimumEntretien.update(
            { valeur },
            { where: { id_score_minimum_entretien: id } }
        );
        
        if (nbUpdated === 0) {
            throw new Error('Score minimum entretien introuvable');
        }
        
        return await ScoreMinimumEntretien.findByPk(id);
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour du score minimum entretien: ${error.message}`);
    }
};

// Supprimer un score minimum entretien
const deleteScoreMinimumEntretien = async (id) => {
    try {
        const nbDeleted = await ScoreMinimumEntretien.destroy({
            where: { id_score_minimum_entretien: id }
        });
        
        if (nbDeleted === 0) {
            throw new Error('Score minimum entretien introuvable');
        }
        
        return { message: 'Score minimum entretien supprimé avec succès' };
    } catch (error) {
        throw new Error(`Erreur lors de la suppression du score minimum entretien: ${error.message}`);
    }
};

// ===== FONCTION GLOBALE POUR RÉCUPÉRER TOUS LES PARAMÈTRES =====

// Récupérer tous les paramètres de configuration
const getAllParametres = async () => {
    try {
        const [
            delaiEntretien,
            delaiQcm,
            pourcentageMinimumCv,
            scoreMinimumQcm,
            scoresMinimumEntretien
        ] = await Promise.all([
            getDelaiEntretien(),
            getDelaiQcm(),
            getPourcentageMinimumCv(),
            getScoreMinimumQcm(),
            getScoreMinimumEntretien()
        ]);

        return {
            delaiEntretien,
            delaiQcm,
            pourcentageMinimumCv,
            scoreMinimumQcm,
            scoresMinimumEntretien
        };
    } catch (error) {
        throw new Error(`Erreur lors de la récupération des paramètres: ${error.message}`);
    }
};

module.exports = {
    // Délai entretien
    getDelaiEntretien,
    updateDelaiEntretien,
    
    // Délai QCM
    getDelaiQcm,
    updateDelaiQcm,
    
    // Pourcentage minimum CV
    getPourcentageMinimumCv,
    updatePourcentageMinimumCv,
    
    // Score minimum QCM
    getScoreMinimumQcm,
    updateScoreMinimumQcm,
    
    // Score minimum entretien
    getScoreMinimumEntretien,
    getScoreMinimumEntretienById,
    createScoreMinimumEntretien,
    updateScoreMinimumEntretien,
    deleteScoreMinimumEntretien,
    
    // Fonction globale
    getAllParametres
};