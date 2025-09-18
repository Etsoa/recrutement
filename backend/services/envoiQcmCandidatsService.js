const db = require('../config/db');
const crypto = require('crypto');

// Créer un envoi QCM pour un candidat
const createEnvoiQcm = async (id_candidat) => {
    try {
        if (!id_candidat) {
            throw new Error('ID candidat requis');
        }
        
        const token = crypto.randomBytes(32).toString('hex');
        const lien = `${process.env.FRONTEND_URL}/qcm/${token}`;
        
        const query = `
            INSERT INTO envoi_qcm_candidats (id_candidat, lien, token, date_envoi)
            VALUES ($1, $2, $3, CURRENT_DATE)
            RETURNING id_envoi_qcm_candidat, token, lien
        `;
        
        const result = await db.query(query, [id_candidat, lien, token]);
        
        if (!result.rows || result.rows.length === 0) {
            throw new Error('Échec de la création de l\'envoi QCM');
        }
        
        return result.rows[0];
    } catch (error) {
        console.error('Erreur dans createEnvoiQcm:', error.message);
        throw new Error(`Erreur lors de la création de l'envoi QCM: ${error.message}`);
    }
};

// Vérifier la validité d'un token QCM
const verifyTokenQcm = async (token) => {
    try {
        if (!token) {
            throw new Error('Token requis');
        }
        
        const query = `
            SELECT * FROM v_envoi_qcm_complete
            WHERE token = $1
        `;
        
        const result = await db.query(query, [token]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Erreur dans verifyTokenQcm:', error.message);
        throw new Error(`Erreur lors de la vérification du token QCM: ${error.message}`);
    }
};

// Vérifier si un QCM a déjà été répondu
const checkQcmCompleted = async (id_envoi_qcm_candidat) => {
    try {
        if (!id_envoi_qcm_candidat) {
            throw new Error('ID envoi QCM candidat requis');
        }
        
        const query = `
            SELECT COUNT(*) as count FROM reponse_qcm_candidats
            WHERE id_envoi_qcm_candidat = $1
        `;
        
        const result = await db.query(query, [id_envoi_qcm_candidat]);
        return parseInt(result.rows[0].count) > 0;
    } catch (error) {
        console.error('Erreur dans checkQcmCompleted:', error.message);
        throw new Error(`Erreur lors de la vérification du QCM: ${error.message}`);
    }
};

// Récupérer les envois QCM d'un candidat
const getEnvoiQcmByCandidat = async (id_candidat) => {
    try {
        if (!id_candidat) {
            throw new Error('ID candidat requis');
        }
        
        const query = `
            SELECT * FROM v_envoi_qcm_complete
            WHERE id_candidat = $1
            ORDER BY date_envoi DESC
        `;
        
        const result = await db.query(query, [id_candidat]);
        return result.rows || [];
    } catch (error) {
        console.error('Erreur dans getEnvoiQcmByCandidat:', error.message);
        throw new Error(`Erreur lors de la récupération des envois QCM: ${error.message}`);
    }
};

// Marquer un QCM comme expiré ou invalidé
const invalidateToken = async (token) => {
    try {
        if (!token) {
            throw new Error('Token requis');
        }
        
        const query = `
            UPDATE envoi_qcm_candidats 
            SET token = CONCAT(token, '_EXPIRED')
            WHERE token = $1
            RETURNING *
        `;
        
        const result = await db.query(query, [token]);
        
        if (!result.rows || result.rows.length === 0) {
            throw new Error('Token introuvable ou déjà invalidé');
        }
        
        return result.rows[0];
    } catch (error) {
        console.error('Erreur dans invalidateToken:', error.message);
        throw new Error(`Erreur lors de l'invalidation du token: ${error.message}`);
    }
};

module.exports = {
    createEnvoiQcm,
    verifyTokenQcm,
    checkQcmCompleted,
    getEnvoiQcmByCandidat,
    invalidateToken
};