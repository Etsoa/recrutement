const db = require('../config/db');

// Enregistrer une réponse QCM d'un candidat
const createReponseQcm = async (reponseData) => {
    try {
        const {
            id_envoi_qcm_candidat, id_qcm_annonce, debut, fin,
            duree, reponse, score
        } = reponseData;
        
        if (!id_envoi_qcm_candidat || !id_qcm_annonce) {
            throw new Error('id_envoi_qcm_candidat et id_qcm_annonce sont requis');
        }
        
        const query = `
            INSERT INTO reponse_qcm_candidats 
            (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, reponse, score)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        
        const result = await db.query(query, [
            id_envoi_qcm_candidat, id_qcm_annonce, debut, fin,
            duree, reponse, score
        ]);
        
        if (!result.rows || result.rows.length === 0) {
            throw new Error('Échec de la création de la réponse QCM');
        }
        
        return result.rows[0];
    } catch (error) {
        console.error('Erreur dans createReponseQcm:', error.message);
        throw new Error(`Erreur lors de l'enregistrement de la réponse QCM: ${error.message}`);
    }
};

// Enregistrer toutes les réponses QCM en une transaction
const createMultipleReponses = async (reponsesData) => {
    if (!reponsesData || reponsesData.length === 0) {
        throw new Error('Données de réponses requises');
    }
    
    const client = await db.getClient();
    
    try {
        await client.query('BEGIN');
        
        const reponses = [];
        
        for (const reponseData of reponsesData) {
            const {
                id_envoi_qcm_candidat, id_qcm_annonce, debut, fin,
                duree, reponse, score
            } = reponseData;
            
            if (!id_envoi_qcm_candidat || !id_qcm_annonce) {
                throw new Error('id_envoi_qcm_candidat et id_qcm_annonce sont requis pour chaque réponse');
            }
            
            const result = await client.query(`
                INSERT INTO reponse_qcm_candidats 
                (id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, reponse, score)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *
            `, [id_envoi_qcm_candidat, id_qcm_annonce, debut, fin, duree, reponse, score]);
            
            reponses.push(result.rows[0]);
        }
        
        await client.query('COMMIT');
        return reponses;
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Erreur dans createMultipleReponses:', error.message);
        throw new Error(`Erreur lors de l'enregistrement multiple des réponses: ${error.message}`);
    } finally {
        client.release();
    }
};

// Récupérer les résultats QCM d'un candidat
const getResultatsQcmByToken = async (token) => {
    try {
        if (!token) {
            throw new Error('Token requis');
        }
        
        const query = `
            SELECT * FROM v_resultats_qcm
            WHERE token = $1
        `;
        
        const result = await db.query(query, [token]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Erreur dans getResultatsQcmByToken:', error.message);
        throw new Error(`Erreur lors de la récupération des résultats QCM: ${error.message}`);
    }
};

// Récupérer toutes les réponses d'un envoi QCM
const getReponsesByEnvoi = async (id_envoi_qcm_candidat) => {
    try {
        if (!id_envoi_qcm_candidat) {
            throw new Error('ID envoi QCM candidat requis');
        }
        
        const query = `
            SELECT 
                rqc.*,
                qq.intitule as question,
                rq.reponse as reponse_donnee,
                rq.modalite as est_correcte
            FROM reponse_qcm_candidats rqc
            JOIN qcm_annonces qa ON rqc.id_qcm_annonce = qa.id_qcm_annonce
            JOIN question_qcms qq ON qa.id_question_qcm = qq.id_question
            JOIN reponse_qcms rq ON rq.id_reponse_qcm = CAST(rqc.reponse AS INTEGER)
            WHERE rqc.id_envoi_qcm_candidat = $1
            ORDER BY rqc.id_reponse_qcm_candidat
        `;
        
        const result = await db.query(query, [id_envoi_qcm_candidat]);
        return result.rows || [];
    } catch (error) {
        console.error('Erreur dans getReponsesByEnvoi:', error.message);
        throw new Error(`Erreur lors de la récupération des réponses: ${error.message}`);
    }
};

// Calculer les statistiques d'un QCM
const calculateQcmStats = async (id_envoi_qcm_candidat) => {
    try {
        if (!id_envoi_qcm_candidat) {
            throw new Error('ID envoi QCM candidat requis');
        }
        
        const query = `
            SELECT 
                COUNT(*) as total_questions,
                SUM(score) as bonnes_reponses,
                AVG(score) * 100 as pourcentage,
                AVG(score) * 20 as score_sur_20,
                MIN(debut) as debut_qcm,
                MAX(fin) as fin_qcm,
                MAX(duree) as duree_totale
            FROM reponse_qcm_candidats
            WHERE id_envoi_qcm_candidat = $1
        `;
        
        const result = await db.query(query, [id_envoi_qcm_candidat]);
        const stats = result.rows[0];
        
        if (!stats || parseInt(stats.total_questions) === 0) {
            throw new Error('Aucune réponse trouvée pour ce QCM');
        }
        
        return {
            total_questions: parseInt(stats.total_questions),
            bonnes_reponses: parseInt(stats.bonnes_reponses) || 0,
            pourcentage: Math.round(parseFloat(stats.pourcentage) || 0),
            score_sur_20: Math.round(parseFloat(stats.score_sur_20) || 0),
            debut_qcm: stats.debut_qcm,
            fin_qcm: stats.fin_qcm,
            duree_totale: parseInt(stats.duree_totale) || 0
        };
    } catch (error) {
        console.error('Erreur dans calculateQcmStats:', error.message);
        throw new Error(`Erreur lors du calcul des statistiques: ${error.message}`);
    }
};

// Récupérer l'id_qcm_annonce par question
const getQcmAnnonceByQuestion = async (id_question, id_annonce) => {
    try {
        if (!id_question || !id_annonce) {
            throw new Error('ID question et ID annonce requis');
        }
        
        const query = `
            SELECT id_qcm_annonce 
            FROM qcm_annonces
            WHERE id_question_qcm = $1 AND id_annonce = $2
            LIMIT 1
        `;
        
        const result = await db.query(query, [id_question, id_annonce]);
        return result.rows[0]?.id_qcm_annonce || null;
    } catch (error) {
        console.error('Erreur dans getQcmAnnonceByQuestion:', error.message);
        throw new Error(`Erreur lors de la récupération du QCM annonce: ${error.message}`);
    }
};

module.exports = {
    createReponseQcm,
    createMultipleReponses,
    getResultatsQcmByToken,
    getReponsesByEnvoi,
    calculateQcmStats,
    getQcmAnnonceByQuestion
};