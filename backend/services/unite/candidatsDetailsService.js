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
        // Définir toutes les tranches possibles
        const allTranches = [
            { tranche: 'Moins de 1 an', order: 1 },
            { tranche: '2-4 ans', order: 2 },
            { tranche: '5-7 ans', order: 3 },
            { tranche: '+8 ans', order: 4 }
        ];

        // Utiliser une requête SQL brute pour sommer les expériences par candidat
        const query = `
            WITH candidat_total_experience AS (
                -- D'abord, sommer toutes les années d'expérience par candidat
                SELECT 
                    c.id_candidat,
                    COALESCE(
                        SUM(
                            EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut))
                        ), 
                        0
                    ) as total_annees_experience
                FROM candidats c
                LEFT JOIN experience_tiers et ON c.id_tiers = et.id_tiers
                GROUP BY c.id_candidat
            ),
            experience_tranches AS (
                -- Ensuite, classer chaque candidat dans une tranche
                SELECT 
                    id_candidat,
                    CASE
                        WHEN total_annees_experience < 1 THEN 'Moins de 1 an'
                        WHEN total_annees_experience BETWEEN 2 AND 4 THEN '2-4 ans'
                        WHEN total_annees_experience BETWEEN 5 AND 7 THEN '5-7 ans'
                        WHEN total_annees_experience >= 8 THEN '+8 ans'
                        ELSE 'Moins de 1 an'
                    END as tranche_experience
                FROM candidat_total_experience
            )
            -- Enfin, compter le nombre de candidats par tranche
            SELECT 
                tranche_experience,
                COUNT(DISTINCT id_candidat)::int as nbr_candidats
            FROM experience_tranches
            GROUP BY tranche_experience
            ORDER BY 
                CASE tranche_experience
                    WHEN 'Moins de 1 an' THEN 1
                    WHEN '2-4 ans' THEN 2
                    WHEN '5-7 ans' THEN 3
                    WHEN '+8 ans' THEN 4
                    ELSE 5
                END;
        `;
        
        const rows = await db.query(query, { type: QueryTypes.SELECT });
        
        // Créer un map des résultats existants
        const resultMap = new Map(rows.map(row => [row.tranche_experience, row.nbr_candidats]));
        
        // Remplir avec toutes les tranches, mettant 0 pour celles sans données
        const completeResults = allTranches.map(({ tranche, order }) => ({
            tranche_experience: tranche,
            nbr_candidats: resultMap.get(tranche) || 0
        }));
        
        return completeResults;
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
        // Définir toutes les tranches possibles
        const allTranches = [
            { tranche: 'Moins de 1 an', order: 1 },
            { tranche: '2-4 ans', order: 2 },
            { tranche: '5-7 ans', order: 3 },
            { tranche: '+8 ans', order: 4 }
        ];

        const query = `
            WITH candidat_total_experience AS (
                -- D'abord, sommer toutes les années d'expérience par candidat
                SELECT 
                    c.id_candidat,
                    COALESCE(
                        SUM(
                            EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut))
                        ), 
                        0
                    ) as total_annees_experience
                FROM candidats c
                JOIN annonces a ON c.id_annonce = a.id_annonce
                LEFT JOIN experience_tiers et ON c.id_tiers = et.id_tiers
                WHERE a.id_unite = $1
                GROUP BY c.id_candidat
            ),
            experience_tranches AS (
                -- Ensuite, classer chaque candidat dans une tranche
                SELECT 
                    id_candidat,
                    CASE
                        WHEN total_annees_experience < 1 THEN 'Moins de 1 an'
                        WHEN total_annees_experience BETWEEN 2 AND 4 THEN '2-4 ans'
                        WHEN total_annees_experience BETWEEN 5 AND 7 THEN '5-7 ans'
                        WHEN total_annees_experience >= 8 THEN '+8 ans'
                        ELSE 'Moins de 1 an'
                    END as tranche_experience
                FROM candidat_total_experience
            )
            -- Enfin, compter le nombre de candidats par tranche
            SELECT 
                tranche_experience,
                COUNT(DISTINCT id_candidat)::int as nbr_candidats
            FROM experience_tranches
            GROUP BY tranche_experience
            ORDER BY 
                CASE tranche_experience
                    WHEN 'Moins de 1 an' THEN 1
                    WHEN '2-4 ans' THEN 2
                    WHEN '5-7 ans' THEN 3
                    WHEN '+8 ans' THEN 4
                    ELSE 5
                END;
        `;
        
        const rows = await db.query(query, { bind: [id_unite], type: QueryTypes.SELECT });
        
        // Créer un map des résultats existants
        const resultMap = new Map(rows.map(row => [row.tranche_experience, row.nbr_candidats]));
        
        // Remplir avec toutes les tranches, mettant 0 pour celles sans données
        const completeResults = allTranches.map(({ tranche, order }) => ({
            tranche_experience: tranche,
            nbr_candidats: resultMap.get(tranche) || 0
        }));
        
        return completeResults;
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
