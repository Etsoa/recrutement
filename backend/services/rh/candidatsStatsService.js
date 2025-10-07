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
    const query = `
      SELECT 
        CASE 
          WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) BETWEEN 1 AND 3 THEN '1-3 ans'
          WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) BETWEEN 4 AND 6 THEN '4-6 ans'
          WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) BETWEEN 7 AND 9 THEN '7-9 ans'
          WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) >= 10 THEN '10+ ans'
          ELSE 'Moins de 1 an'
        END as tranche_experience,
        COUNT(*)::int as total
      FROM candidats c
      JOIN tiers t ON c.id_tiers = t.id_tiers
      JOIN experience_tiers et ON t.id_tiers = et.id_tiers
      GROUP BY 
        CASE 
          WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) BETWEEN 1 AND 3 THEN '1-3 ans'
          WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) BETWEEN 4 AND 6 THEN '4-6 ans'
          WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) BETWEEN 7 AND 9 THEN '7-9 ans'
          WHEN EXTRACT(YEAR FROM AGE(COALESCE(et.date_fin, CURRENT_DATE), et.date_debut)) >= 10 THEN '10+ ans'
          ELSE 'Moins de 1 an'
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
    
    const result = await pool.query(query);
    return result.rows;
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