const db = require('../config/db');

// Créer un candidat
const createCandidat = async (candidatData) => {
    try {
        const { id_tiers, id_annonce, cv } = candidatData;
        
        if (!id_tiers || !id_annonce) {
            throw new Error('id_tiers et id_annonce sont requis');
        }
        
        const query = `
            INSERT INTO candidats (id_tiers, id_annonce, cv)
            VALUES ($1, $2, $3)
            RETURNING id_candidat
        `;
        
        const result = await db.query(query, [id_tiers, id_annonce, cv]);
        
        if (!result.rows || result.rows.length === 0) {
            throw new Error('Échec de la création du candidat');
        }
        
        return result.rows[0];
    } catch (error) {
        console.error('Erreur dans createCandidat:', error.message);
        throw new Error(`Erreur lors de la création du candidat: ${error.message}`);
    }
};

// Vérifier si un candidat existe déjà pour une annonce
const checkCandidatExists = async (id_tiers, id_annonce) => {
    try {
        if (!id_tiers || !id_annonce) {
            throw new Error('id_tiers et id_annonce sont requis');
        }
        
        const query = `
            SELECT id_candidat FROM candidats 
            WHERE id_tiers = $1 AND id_annonce = $2
        `;
        
        const result = await db.query(query, [id_tiers, id_annonce]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Erreur dans checkCandidatExists:', error.message);
        throw new Error(`Erreur lors de la vérification du candidat: ${error.message}`);
    }
};

// Récupérer un candidat complet par ID
const getCandidatCompleteById = async (id) => {
    try {
        if (!id) {
            throw new Error('ID candidat requis');
        }
        
        const query = `SELECT * FROM v_candidats_complete WHERE id_candidat = $1`;
        const result = await db.query(query, [id]);
        
        return result.rows[0] || null;
    } catch (error) {
        console.error('Erreur dans getCandidatCompleteById:', error.message);
        throw new Error(`Erreur lors de la récupération du candidat: ${error.message}`);
    }
};

// Récupérer tous les candidats pour une annonce
const getCandidatsByAnnonce = async (id_annonce) => {
    try {
        if (!id_annonce) {
            throw new Error('ID annonce requis');
        }
        
        const query = `
            SELECT * FROM v_candidats_complete 
            WHERE id_annonce = $1
            ORDER BY id_candidat DESC
        `;
        
        const result = await db.query(query, [id_annonce]);
        return result.rows || [];
    } catch (error) {
        console.error('Erreur dans getCandidatsByAnnonce:', error.message);
        throw new Error(`Erreur lors de la récupération des candidats pour l'annonce: ${error.message}`);
    }
};

// Récupérer tous les candidats d'un tiers
const getCandidatsByTiers = async (id_tiers) => {
    try {
        if (!id_tiers) {
            throw new Error('ID tiers requis');
        }
        
        const query = `
            SELECT * FROM v_candidats_complete 
            WHERE id_tiers = $1
            ORDER BY id_candidat DESC
        `;
        
        const result = await db.query(query, [id_tiers]);
        return result.rows || [];
    } catch (error) {
        console.error('Erreur dans getCandidatsByTiers:', error.message);
        throw new Error(`Erreur lors de la récupération des candidats du tiers: ${error.message}`);
    }
};

// Mettre à jour le CV d'un candidat
const updateCandidatCv = async (id_candidat, cv) => {
    try {
        if (!id_candidat) {
            throw new Error('ID candidat requis');
        }
        
        const query = `
            UPDATE candidats 
            SET cv = $2
            WHERE id_candidat = $1
            RETURNING *
        `;
        
        const result = await db.query(query, [id_candidat, cv]);
        
        if (!result.rows || result.rows.length === 0) {
            throw new Error('Candidat introuvable ou mise à jour échouée');
        }
        
        return result.rows[0];
    } catch (error) {
        console.error('Erreur dans updateCandidatCv:', error.message);
        throw new Error(`Erreur lors de la mise à jour du CV: ${error.message}`);
    }
};

module.exports = {
    createCandidat,
    checkCandidatExists,
    getCandidatCompleteById,
    getCandidatsByAnnonce,
    getCandidatsByTiers,
    updateCandidatCv
};