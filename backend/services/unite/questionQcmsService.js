const db = require('../../config/db');

// Récupérer toutes les questions QCM avec leurs réponses
const getAllQuestionsComplete = async () => {
    try {
        const query = `
            SELECT 
                id_question,
                intitule,
                reponses
            FROM v_questions_qcm_complete
            ORDER BY id_question
        `;
        
        const result = await db.query(query);
        return result.rows || [];
    } catch (error) {
        console.error('Erreur dans getAllQuestionsComplete:', error.message);
        throw new Error(`Erreur lors de la récupération des questions QCM: ${error.message}`);
    }
};

// Récupérer les questions QCM pour une annonce spécifique
const getQuestionsByAnnonce = async (id_annonce) => {
    try {
        if (!id_annonce) {
            throw new Error('ID annonce requis');
        }
        
        const query = `
            SELECT 
                id_question,
                intitule,
                reponses
            FROM v_qcm_par_annonce
            WHERE id_annonce = $1
            ORDER BY RANDOM()
        `;
        
        const result = await db.query(query, [id_annonce]);
        return result.rows || [];
    } catch (error) {
        console.error('Erreur dans getQuestionsByAnnonce:', error.message);
        throw new Error(`Erreur lors de la récupération des questions pour l'annonce: ${error.message}`);
    }
};

// Récupérer une question QCM par ID avec ses réponses
const getQuestionById = async (id_question) => {
    try {
        if (!id_question) {
            throw new Error('ID question requis');
        }
        
        const query = `
            SELECT 
                id_question,
                intitule,
                reponses
            FROM v_questions_qcm_complete
            WHERE id_question = $1
        `;
        
        const result = await db.query(query, [id_question]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Erreur dans getQuestionById:', error.message);
        throw new Error(`Erreur lors de la récupération de la question: ${error.message}`);
    }
};

// Vérifier si une réponse est correcte
const verifyReponse = async (id_reponse_qcm) => {
    try {
        if (!id_reponse_qcm) {
            throw new Error('ID réponse QCM requis');
        }
        
        const query = `
            SELECT modalite FROM reponse_qcms
            WHERE id_reponse_qcm = $1
        `;
        
        const result = await db.query(query, [id_reponse_qcm]);
        return result.rows[0]?.modalite || false;
    } catch (error) {
        console.error('Erreur dans verifyReponse:', error.message);
        throw new Error(`Erreur lors de la vérification de la réponse: ${error.message}`);
    }
};

// Récupérer toutes les bonnes réponses pour une liste de questions
const getBonnesReponses = async (question_ids) => {
    try {
        if (!question_ids || question_ids.length === 0) {
            return [];
        }
        
        const placeholders = question_ids.map((_, index) => `$${index + 1}`).join(',');
        const query = `
            SELECT 
                rq.id_question_qcm as id_question,
                rq.id_reponse_qcm,
                rq.reponse
            FROM reponse_qcms rq
            WHERE rq.id_question_qcm IN (${placeholders})
            AND rq.modalite = true
        `;
        
        const result = await db.query(query, question_ids);
        return result.rows || [];
    } catch (error) {
        console.error('Erreur dans getBonnesReponses:', error.message);
        throw new Error(`Erreur lors de la récupération des bonnes réponses: ${error.message}`);
    }
};

// Compter le nombre de questions pour une annonce
const countQuestionsByAnnonce = async (id_annonce) => {
    try {
        if (!id_annonce) {
            throw new Error('ID annonce requis');
        }
        
        const query = `
            SELECT COUNT(*) as count
            FROM qcm_annonces
            WHERE id_annonce = $1
        `;
        
        const result = await db.query(query, [id_annonce]);
        return parseInt(result.rows[0].count) || 0;
    } catch (error) {
        console.error('Erreur dans countQuestionsByAnnonce:', error.message);
        throw new Error(`Erreur lors du comptage des questions: ${error.message}`);
    }
};

module.exports = {
    getAllQuestionsComplete,
    getQuestionsByAnnonce,
    getQuestionById,
    verifyReponse,
    getBonnesReponses,
    countQuestionsByAnnonce
};