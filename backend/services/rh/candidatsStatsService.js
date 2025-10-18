// services/rh/candidatsStatsService.js - Service pour les statistiques RH générales
const pool = require('../../config/db');

// ===== STATISTIQUES GÉNÉRALES POUR RH (TOUTES LES ANNONCES) =====

// Nombre total de candidatures (toutes annonces)
const countAllCandidatures = async () => {
  try {
    const query = `
      SELECT COUNT(*)::int as total_candidatures
      FROM candidats c;
    `;
    
    const result = await pool.query(query);
    return result.rows[0]?.total_candidatures || 0;
  } catch (error) {
    console.error('Erreur countAllCandidatures:', error);
    return 0;
  }
};

// Age minimum (toutes annonces)
const getAgeMinGeneral = async () => {
  try {
    const query = `
      SELECT MIN(c.age) as age_min
      FROM candidats c;
    `;
    
    const result = await pool.query(query);
    return result.rows[0]?.age_min || 0;
  } catch (error) {
    console.error('Erreur getAgeMinGeneral:', error);
    return 0;
  }
};

// Age maximum (toutes annonces)
const getAgeMaxGeneral = async () => {
  try {
    const query = `
      SELECT MAX(c.age) as age_max
      FROM candidats c;
    `;
    
    const result = await pool.query(query);
    return result.rows[0]?.age_max || 0;
  } catch (error) {
    console.error('Erreur getAgeMaxGeneral:', error);
    return 0;
  }
};

// Age moyen (toutes annonces)
const getAgeMoyenGeneral = async () => {
  try {
    const query = `
      SELECT AVG(c.age) as age_moyen
      FROM candidats c;
    `;
    
    const result = await pool.query(query);
    return parseFloat(result.rows[0]?.age_moyen) || 0;
  } catch (error) {
    console.error('Erreur getAgeMoyenGeneral:', error);
    return 0;
  }
};

// Candidats par tranches d'âge prédéfinies (toutes annonces)
const countByAgeRangesGeneral = async () => {
  try {
    const query = `
      SELECT 
        CASE 
          WHEN c.age BETWEEN 18 AND 25 THEN '18-25 ans'
          WHEN c.age BETWEEN 26 AND 35 THEN '26-35 ans'
          WHEN c.age BETWEEN 36 AND 45 THEN '36-45 ans'
          WHEN c.age BETWEEN 46 AND 55 THEN '46-55 ans'
          ELSE '55+ ans'
        END as tranche_age,
        COUNT(*)::int as total
      FROM candidats c
      GROUP BY 
        CASE 
          WHEN c.age BETWEEN 18 AND 25 THEN '18-25 ans'
          WHEN c.age BETWEEN 26 AND 35 THEN '26-35 ans'
          WHEN c.age BETWEEN 36 AND 45 THEN '36-45 ans'
          WHEN c.age BETWEEN 46 AND 55 THEN '46-55 ans'
          ELSE '55+ ans'
        END
      ORDER BY tranche_age;
    `;
    
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Erreur countByAgeRangesGeneral:', error);
    return [];
  }
};

// Candidats par ville (toutes annonces)
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
    
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Erreur countByVilleGeneral:', error);
    return [];
  }
};

// Candidats par genre (toutes annonces)
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
    
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Erreur countByGenreGeneral:', error);
    return [];
  }
};

// Candidats par nombre de langues (toutes annonces)
const countByLanguesGeneral = async () => {
  try {
    const query = `
      SELECT 
        CASE 
          WHEN langue_count = 2 THEN '2 langues'
          WHEN langue_count = 3 THEN '3 langues'
          WHEN langue_count >= 4 THEN '4+ langues'
          ELSE 'Moins de 2 langues'
        END as categorie_langues,
        COUNT(*)::int as total
      FROM (
        SELECT c.id_candidat, COUNT(lt.id_langue) as langue_count
        FROM candidats c
        JOIN tiers t ON c.id_tiers = t.id_tiers
        LEFT JOIN langue_tiers lt ON t.id_tiers = lt.id_tiers
        GROUP BY c.id_candidat
      ) as langue_stats
      WHERE langue_count >= 2
      GROUP BY 
        CASE 
          WHEN langue_count = 2 THEN '2 langues'
          WHEN langue_count = 3 THEN '3 langues'
          WHEN langue_count >= 4 THEN '4+ langues'
          ELSE 'Moins de 2 langues'
        END
      ORDER BY categorie_langues;
    `;
    
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Erreur countByLanguesGeneral:', error);
    return [];
  }
};

// Candidats par niveau d'éducation (toutes annonces)
const countByEducationGeneral = async () => {
  try {
    const query = `
      SELECT n.valeur as niveau_education, COUNT(*)::int as total
      FROM candidats c
      JOIN tiers t ON c.id_tiers = t.id_tiers
      JOIN niveau_filiere_tiers nft ON t.id_tiers = nft.id_tiers
      JOIN niveaux n ON nft.id_niveau = n.id_niveau
      GROUP BY n.valeur, n.id_niveau
      ORDER BY 
        CASE n.valeur
          WHEN 'Baccalauréat' THEN 1
          WHEN 'Licence' THEN 2
          WHEN 'Master' THEN 3
          WHEN 'Doctorat' THEN 4
          ELSE 5
        END;
    `;
    
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Erreur countByEducationGeneral:', error);
    return [];
  }
};

// Candidats par expérience (toutes annonces)
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
        JOIN tiers t ON c.id_tiers = t.id_tiers
        LEFT JOIN experience_tiers et ON t.id_tiers = et.id_tiers
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
    
    const rows = await sequelize.query(query, { type: QueryTypes.SELECT });
    
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
const getAllRhStats = async (ageRange = {}) => {
  try {
    const stats = {
      // Statistiques résumé
      totalCandidatures: await countAllCandidatures(),
      ageMin: await getAgeMinGeneral(),
      ageMax: await getAgeMaxGeneral(),
      ageMoyen: await getAgeMoyenGeneral(),
      
      // Répartitions détaillées
      tranchesAge: await countByAgeRangesGeneral(),
      villes: await countByVilleGeneral(),
      genres: await countByGenreGeneral(),
      langues: await countByLanguesGeneral(),
      education: await countByEducationGeneral(),
      experience: await countByExperienceGeneral()
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
  countByEducationGeneral,
  countByExperienceGeneral,
  getAllRhStats
};