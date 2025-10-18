const ViewCandidatsDetails = require('../../models/viewCandidatsDetailsModel');
const db = require('../../config/db');
const { fn, col, literal, Op, QueryTypes } = require('sequelize'); // <--- ajoute Op et QueryTypes

// Récupérer tous les détails
const getAllCandidatsDetails = async () => {
    try {
        const candidats = await ViewCandidatsDetails.findAll({ raw: true });
        return candidats;
    } catch (error) {
        console.error('Erreur getAllCandidatsDetails:', error);
        return [];
    }
};

// Récupérer le nombre de candidats par nombre de langues
const countByLangues = async () => {
    try {
        const candidats = await ViewCandidatsDetails.findAll({ raw: true });
        const counts = {};
        candidats.forEach(c => {
            counts[c.id_candidat] = counts[c.id_candidat] ? counts[c.id_candidat] + 1 : 1;
        });

        let deux = 0, trois = 0, plus4 = 0;
        Object.values(counts).forEach(n => {
            if (n === 2) deux++;
            else if (n === 3) trois++;
            else if (n > 4) plus4++;
        });

        return { '2 langues': deux, '3 langues': trois, 'plus de 4 langues': plus4 };
    } catch (error) {
        console.error('Erreur countByLangues:', error);
        return { '2_langues': 0, '3_langues': 0, 'plus_4_langues': 0 };
    }
};

// --- Nombre de candidats par niveau ---
const countByNiveau = async () => {
    try {
        const result = await ViewCandidatsDetails.findAll({
            attributes: ['niveau', [fn('COUNT', col('id_candidat')), 'nbr_candidats']],
            where: { niveau: { [Op.ne]: null } },
            group: ['niveau'],
            raw: true
        });
        return result;
    } catch (error) {
        console.error('Erreur countByNiveau:', error);
        return [];
    }
};

const countByExperience = async () => {
    try {
        const result = await ViewCandidatsDetails.findAll({
            attributes: [
                [literal(`CASE
          WHEN experience_annees BETWEEN 1 AND 3 THEN '1-3 ans'
          WHEN experience_annees BETWEEN 4 AND 6 THEN '4-6 ans'
          WHEN experience_annees BETWEEN 7 AND 9 THEN '7-9 ans'
          ELSE '+10 ans'
        END`), 'tranche_experience'],
                [fn('COUNT', col('id_candidat')), 'nbr_candidats']
            ],
            where: { experience_annees: { [Op.ne]: null } },
            group: [literal(`CASE
          WHEN experience_annees BETWEEN 1 AND 3 THEN '1-3 ans'
          WHEN experience_annees BETWEEN 4 AND 6 THEN '4-6 ans'
          WHEN experience_annees BETWEEN 7 AND 9 THEN '7-9 ans'
          ELSE '+10 ans'
        END`)],
            raw: true
        });
        return result;
    } catch (error) {
        console.error('Erreur countByExperience:', error);
        return [];
    }
};

// ===== NOUVELLES FONCTIONS POUR STATISTIQUES PAR UNITE =====

// Nombre de candidats par langues pour une unité
const countByLanguesByUnite = async (id_unite) => {
    try {
        const query = `
            SELECT 
                CASE
                    WHEN langue_count = 2 THEN '2 langues'
                    WHEN langue_count = 3 THEN '3 langues'
                    WHEN langue_count >= 4 THEN '4+ langues'
                    ELSE '1 langue'
                END as category,
                COUNT(*)::int as total
            FROM (
                SELECT c.id_candidat,
                       COUNT(lt.id_langue) as langue_count
                FROM candidats c
                JOIN annonces a ON c.id_annonce = a.id_annonce
                LEFT JOIN langue_tiers lt ON c.id_tiers = lt.id_tiers
                WHERE a.id_unite = $1
                GROUP BY c.id_candidat
            ) as sub
            GROUP BY 
                CASE
                    WHEN langue_count = 2 THEN '2 langues'
                    WHEN langue_count = 3 THEN '3 langues'
                    WHEN langue_count >= 4 THEN '4+ langues'
                    ELSE '1 langue'
                END
            ORDER BY total DESC;
        `;
        
        const rows = await db.query(query, { bind: [id_unite], type: QueryTypes.SELECT });
        
        // Convertir en objet pour compatibilité
        const languesObj = {};
        rows.forEach(row => {
            languesObj[row.category] = row.total;
        });
        
        return languesObj;
    } catch (error) {
        console.error('Erreur countByLanguesByUnite:', error);
        return {};
    }
};

// Nombre de candidats par niveau pour une unité
const countByNiveauByUnite = async (id_unite) => {
    try {
        const query = `
            SELECT n.valeur as niveau, 
                   COUNT(*)::int as nbr_candidats
            FROM candidats c
            JOIN annonces a ON c.id_annonce = a.id_annonce
            JOIN niveau_filiere_tiers nft ON c.id_tiers = nft.id_tiers
            JOIN niveaux n ON nft.id_niveau = n.id_niveau
            WHERE a.id_unite = $1
            GROUP BY n.valeur, n.id_niveau
            ORDER BY n.id_niveau;
        `;
        
    const rows = await db.query(query, { bind: [id_unite], type: QueryTypes.SELECT });
    return rows;
    } catch (error) {
        console.error('Erreur countByNiveauByUnite:', error);
        return [];
    }
};

// Nombre de candidats par expérience pour une unité
const countByExperienceByUnite = async (id_unite) => {
    try {
        const query = `
            SELECT 
                CASE
                    WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) BETWEEN 1 AND 3 THEN '1-3 ans'
                    WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) BETWEEN 4 AND 6 THEN '4-6 ans'
                    WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) BETWEEN 7 AND 9 THEN '7-9 ans'
                    WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) >= 10 THEN '+10 ans'
                    ELSE '0 ans'
                END as tranche_experience,
                COUNT(*)::int as nbr_candidats
            FROM candidats c
            JOIN annonces a ON c.id_annonce = a.id_annonce
            JOIN experience_tiers et ON c.id_tiers = et.id_tiers
            WHERE a.id_unite = $1
            GROUP BY 
                CASE
                    WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) BETWEEN 1 AND 3 THEN '1-3 ans'
                    WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) BETWEEN 4 AND 6 THEN '4-6 ans'
                    WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) BETWEEN 7 AND 9 THEN '7-9 ans'
                    WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) >= 10 THEN '+10 ans'
                    ELSE '0 ans'
                END
            ORDER BY 
                CASE
                    WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) BETWEEN 1 AND 3 THEN 1
                    WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) BETWEEN 4 AND 6 THEN 2
                    WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) BETWEEN 7 AND 9 THEN 3
                    WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) >= 10 THEN 4
                    ELSE 0
                END;
        `;
        
    const rows = await db.query(query, { bind: [id_unite], type: QueryTypes.SELECT });
    return rows;
    } catch (error) {
        console.error('Erreur countByExperienceByUnite:', error);
        return [];
    }
};

module.exports = {
    getAllCandidatsDetails,
    countByLangues,
    countByNiveau,
    countByExperience,
    // Nouvelles fonctions par unité
    countByLanguesByUnite,
    countByNiveauByUnite,
    countByExperienceByUnite
};
