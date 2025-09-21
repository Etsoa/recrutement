const db = require('../../config/db');

// Récupérer tous les paramètres système
const getAllParametresSysteme = async () => {
    try {
        const query = `SELECT parametre, valeur FROM v_parametres_systeme`;
        const result = await db.query(query);

        const parametres = {};
        if (!result || !result.rows || !Array.isArray(result.rows)) {
            throw new Error('Aucun paramètre système trouvé dans la vue v_parametres_systeme');
        }

        result.rows.forEach(row => {
            parametres[row.parametre] = parseInt(row.valeur);
        });

        return parametres;
    } catch (error) {
        console.error("Erreur dans getAllParametresSysteme:", error.message);
        throw new Error(`Erreur lors de la récupération des paramètres système: ${error.message}`);
    }
};

// Récupérer le pourcentage minimum CV
const getPourcentageMinimumCv = async () => {
    try {
        const query = `SELECT valeur FROM pourcentage_minimum_cv LIMIT 1`;
        const result = await db.query(query);
        
        if (!result.rows || result.rows.length === 0) {
            throw new Error('Aucun pourcentage minimum CV configuré');
        }
        
        return result.rows[0].valeur;
    } catch (error) {
        console.error('Erreur dans getPourcentageMinimumCv:', error.message);
        throw new Error(`Erreur lors de la récupération du pourcentage minimum CV: ${error.message}`);
    }
};

// Récupérer le score minimum QCM
const getScoreMinimumQcm = async () => {
    try {
        const query = `SELECT valeur FROM score_minimum_qcm LIMIT 1`;
        const result = await db.query(query);
        
        if (!result.rows || result.rows.length === 0) {
            throw new Error('Aucun score minimum QCM configuré');
        }
        
        return result.rows[0].valeur;
    } catch (error) {
        console.error('Erreur dans getScoreMinimumQcm:', error.message);
        throw new Error(`Erreur lors de la récupération du score minimum QCM: ${error.message}`);
    }
};

// Récupérer le délai QCM (en jours)
const getDelaiQcm = async () => {
    try {
        const query = `SELECT valeur FROM delai_qcm LIMIT 1`;
        const result = await db.query(query);
        
        if (!result.rows || result.rows.length === 0) {
            throw new Error('Aucun délai QCM configuré');
        }
        
        return result.rows[0].valeur;
    } catch (error) {
        console.error('Erreur dans getDelaiQcm:', error.message);
        throw new Error(`Erreur lors de la récupération du délai QCM: ${error.message}`);
    }
};

// Récupérer le score minimum entretien
const getScoreMinimumEntretien = async () => {
    try {
        const query = `SELECT valeur FROM score_minimum_entretien LIMIT 1`;
        const result = await db.query(query);
        
        if (!result.rows || result.rows.length === 0) {
            throw new Error('Aucun score minimum entretien configuré');
        }
        
        return result.rows[0].valeur;
    } catch (error) {
        console.error('Erreur dans getScoreMinimumEntretien:', error.message);
        throw new Error(`Erreur lors de la récupération du score minimum entretien: ${error.message}`);
    }
};

// Récupérer le délai entretien (en jours)
const getDelaiEntretien = async () => {
    try {
        const query = `SELECT valeur FROM delai_entretien LIMIT 1`;
        const result = await db.query(query);
        
        if (!result.rows || result.rows.length === 0) {
            throw new Error('Aucun délai entretien configuré');
        }
        
        return result.rows[0].valeur;
    } catch (error) {
        console.error('Erreur dans getDelaiEntretien:', error.message);
        throw new Error(`Erreur lors de la récupération du délai entretien: ${error.message}`);
    }
};

// Récupérer tous les paramètres de référence pour les formulaires
const getAllParametresReference = async () => {
    try {
        const queries = {
            genres: 'SELECT id_genre, valeur FROM genres ORDER BY valeur',
            situation_matrimoniales: 'SELECT id_situation, valeur FROM situation_matrimoniales ORDER BY valeur',
            langues: 'SELECT id_langue, valeur FROM langues ORDER BY valeur',
            filieres: 'SELECT id_filiere, valeur FROM filieres ORDER BY valeur',
            niveaux: 'SELECT id_niveau, valeur FROM niveaux ORDER BY id_niveau',
            qualites: 'SELECT id_qualite, valeur FROM qualites ORDER BY valeur',
            domaines: 'SELECT id_domaine, valeur FROM domaines ORDER BY valeur',
            villes: 'SELECT id_ville, valeur FROM villes ORDER BY valeur'
        };
        
        const data = {};
        
        for (const [key, query] of Object.entries(queries)) {
            try {
                const result = await db.query(query);
                data[key] = result.rows || [];
            } catch (error) {
                console.error(`Erreur lors de la récupération des ${key}:`, error.message);
                data[key] = [];
            }
        }
        
        // Ajouter les paramètres système
        data.parametres_systeme = await getAllParametresSysteme();
        
        return data;
    } catch (error) {
        console.error('Erreur dans getAllParametresReference:', error.message);
        throw new Error(`Erreur lors de la récupération des paramètres de référence: ${error.message}`);
    }
};

module.exports = {
    getAllParametresSysteme,
    getPourcentageMinimumCv,
    getScoreMinimumQcm,
    getDelaiQcm,
    getScoreMinimumEntretien,
    getDelaiEntretien,
    getAllParametresReference
};