// services/rh/candidatsStatsService.js - Service pour les statistiques RH générales
const db = require('../../config/db');
const { QueryTypes } = require('sequelize');

// ===== STATISTIQUES GÉNÉRALES POUR RH (TOUTES LES ANNONCES, TOUTES LES UNITÉS) =====

// Nombre total de candidatures (toutes annonces, toutes unités)
const countAllCandidatures = async () => {
  try {
    const query = `
      SELECT COUNT(*)::int as total_candidatures
      FROM candidats c;
    `;
    
    const rows = await db.query(query, { type: QueryTypes.SELECT });
    return rows[0]?.total_candidatures || 0;
  } catch (error) {
    console.error('Erreur countAllCandidatures:', error);
    return 0;
  }
};

// Age minimum (toutes annonces, toutes unités) - calculé depuis date_naissance
const getAgeMinGeneral = async () => {
  try {
    const query = `
      SELECT MIN(EXTRACT(YEAR FROM AGE(CURRENT_DATE, t.date_naissance)))::int as age_min
      FROM candidats c
      JOIN tiers t ON c.id_tiers = t.id_tiers
      WHERE t.date_naissance IS NOT NULL;
    `;
    
    const rows = await db.query(query, { type: QueryTypes.SELECT });
    return rows[0]?.age_min || 0;
  } catch (error) {
    console.error('Erreur getAgeMinGeneral:', error);
    return 0;
  }
};

// Age maximum (toutes annonces, toutes unités) - calculé depuis date_naissance
const getAgeMaxGeneral = async () => {
  try {
    const query = `
      SELECT MAX(EXTRACT(YEAR FROM AGE(CURRENT_DATE, t.date_naissance)))::int as age_max
      FROM candidats c
      JOIN tiers t ON c.id_tiers = t.id_tiers
      WHERE t.date_naissance IS NOT NULL;
    `;
    
    const rows = await db.query(query, { type: QueryTypes.SELECT });
    return rows[0]?.age_max || 0;
  } catch (error) {
    console.error('Erreur getAgeMaxGeneral:', error);
    return 0;
  }
};

// Age moyen (toutes annonces, toutes unités) - calculé depuis date_naissance
const getAgeMoyenGeneral = async () => {
  try {
    const query = `
      SELECT AVG(EXTRACT(YEAR FROM AGE(CURRENT_DATE, t.date_naissance)))::numeric(10,2) as age_moyen
      FROM candidats c
      JOIN tiers t ON c.id_tiers = t.id_tiers
      WHERE t.date_naissance IS NOT NULL;
    `;
    
    const rows = await db.query(query, { type: QueryTypes.SELECT });
    return parseFloat(rows[0]?.age_moyen) || 0;
  } catch (error) {
    console.error('Erreur getAgeMoyenGeneral:', error);
    return 0;
  }
};

// Candidats par tranches d'âge prédéfinies (toutes annonces, toutes unités)
const countByAgeRangesGeneral = async () => {
  try {
    const query = `
      SELECT 
        CASE 
          WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, t.date_naissance)) BETWEEN 18 AND 25 THEN '18-25 ans'
          WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, t.date_naissance)) BETWEEN 26 AND 35 THEN '26-35 ans'
          WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, t.date_naissance)) BETWEEN 36 AND 45 THEN '36-45 ans'
          WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, t.date_naissance)) BETWEEN 46 AND 55 THEN '46-55 ans'
          ELSE '55+ ans'
        END as tranche_age,
        COUNT(*)::int as total
      FROM candidats c
      JOIN tiers t ON c.id_tiers = t.id_tiers
      WHERE t.date_naissance IS NOT NULL
      GROUP BY 
        CASE 
          WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, t.date_naissance)) BETWEEN 18 AND 25 THEN '18-25 ans'
          WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, t.date_naissance)) BETWEEN 26 AND 35 THEN '26-35 ans'
          WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, t.date_naissance)) BETWEEN 36 AND 45 THEN '36-45 ans'
          WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, t.date_naissance)) BETWEEN 46 AND 55 THEN '46-55 ans'
          ELSE '55+ ans'
        END
      ORDER BY tranche_age;
    `;
    
    const rows = await db.query(query, { type: QueryTypes.SELECT });
    return rows;
  } catch (error) {
    console.error('Erreur countByAgeRangesGeneral:', error);
    return [];
  }
};

// Candidats par ville (toutes annonces, toutes unités)
const countByVilleGeneral = async () => {
  try {
    const query = `
      SELECT v.valeur as ville, COUNT(*)::int as total
      FROM candidats c
      JOIN tiers t ON c.id_tiers = t.id_tiers
      JOIN villes v ON t.id_ville = v.id_ville
      GROUP BY v.valeur
      ORDER BY total DESC;
    `;
    
    const rows = await db.query(query, { type: QueryTypes.SELECT });
    return rows;
  } catch (error) {
    console.error('Erreur countByVilleGeneral:', error);
    return [];
  }
};

// Candidats par genre (toutes annonces, toutes unités)
const countByGenreGeneral = async () => {
  try {
    const query = `
      SELECT g.valeur as genre, COUNT(*)::int as total
      FROM candidats c
      JOIN tiers t ON c.id_tiers = t.id_tiers
      JOIN genres g ON t.id_genre = g.id_genre
      GROUP BY g.valeur
      ORDER BY total DESC;
    `;
    
    const rows = await db.query(query, { type: QueryTypes.SELECT });
    return rows;
  } catch (error) {
    console.error('Erreur countByGenreGeneral:', error);
    return [];
  }
};

// Candidats par nombre de langues (toutes annonces, toutes unités)
const countByLanguesGeneral = async () => {
  try {
    // D'abord vérifier combien de candidats ont des langues
    const debugQuery = `
      SELECT COUNT(DISTINCT c.id_candidat) as total_candidats,
             COUNT(lt.id_langue) as total_langues
      FROM candidats c
      LEFT JOIN langue_tiers lt ON c.id_tiers = lt.id_tiers;
    `;
    
    const debugResult = await db.query(debugQuery, { type: QueryTypes.SELECT });
    console.log('DEBUG countByLanguesGeneral - Total candidats et langues:', debugResult);
    
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
        LEFT JOIN langue_tiers lt ON c.id_tiers = lt.id_tiers
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
    
    const rows = await db.query(query, { type: QueryTypes.SELECT });
    
    console.log('countByLanguesGeneral - Résultats bruts:', rows);
    
    // Si aucun résultat, retourner un objet vide plutôt qu'un objet avec des catégories à 0
    if (!rows || rows.length === 0) {
      console.log('countByLanguesGeneral - Aucun résultat, retour objet vide');
      return {};
    }
    
    // Convertir en objet pour compatibilité avec Unite
    const languesObj = {};
    rows.forEach(row => {
      languesObj[row.category] = row.total;
    });
    
    console.log('countByLanguesGeneral - Objet final:', languesObj);
    
    return languesObj;
  } catch (error) {
    console.error('Erreur countByLanguesGeneral:', error);
    return {};
  }
};

// Candidats par niveau d'éducation (toutes annonces, toutes unités)
const countByNiveauGeneral = async () => {
  try {
    const query = `
      SELECT n.valeur as niveau, 
             COUNT(*)::int as nbr_candidats
      FROM candidats c
      JOIN niveau_filiere_tiers nft ON c.id_tiers = nft.id_tiers
      JOIN niveaux n ON nft.id_niveau = n.id_niveau
      GROUP BY n.valeur, n.id_niveau
      ORDER BY n.id_niveau;
    `;
    
    const rows = await db.query(query, { type: QueryTypes.SELECT });
    return rows;
  } catch (error) {
    console.error('Erreur countByNiveauGeneral:', error);
    return [];
  }
};

// Candidats par expérience (toutes annonces, toutes unités)
const countByExperienceGeneral = async () => {
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
        COUNT(DISTINCT id_candidat)::int as total
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
    const resultMap = new Map(rows.map(row => [row.tranche_experience, row.total]));
    
    // Remplir avec toutes les tranches, mettant 0 pour celles sans données
    const completeResults = allTranches.map(({ tranche, order }) => ({
      tranche_experience: tranche,
      total: resultMap.get(tranche) || 0
    }));
    
    return completeResults;
  } catch (error) {
    console.error('Erreur countByExperienceGeneral:', error);
    return [];
  }
};

// Fonction principale pour récupérer toutes les statistiques RH
const getAllRhStats = async () => {
  try {
    const stats = {
      // Statistiques résumé
      totalCandidatures: await countAllCandidatures(),
      ageMin: await getAgeMinGeneral(),
      ageMax: await getAgeMaxGeneral(),
      ageMoyen: await getAgeMoyenGeneral(),
      
      // Répartitions détaillées (même structure que Unite)
      byAge: await countByAgeRangesGeneral(),
      byVille: await countByVilleGeneral(),
      byGenre: await countByGenreGeneral(),
      byLangue: await countByLanguesGeneral(),
      byNiveau: await countByNiveauGeneral(),
      byExperience: await countByExperienceGeneral()
    };
    
    return stats;
  } catch (error) {
    console.error('Erreur getAllRhStats:', error);
    throw error;
  }
};

module.exports = {
  countAllCandidatures,
  getAgeMinGeneral,
  getAgeMaxGeneral,
  getAgeMoyenGeneral,
  countByAgeRangesGeneral,
  countByVilleGeneral,
  countByGenreGeneral,
  countByLanguesGeneral,
  countByNiveauGeneral,
  countByExperienceGeneral,
  getAllRhStats
};