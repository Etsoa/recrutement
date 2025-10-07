// services/candidatService.js
const Candidat = require('../../models/viewCandidatsModel');
const pool = require('../../config/db'); 
const { Sequelize, fn, col, literal } = require('sequelize'); // ✅ à importer

// ✅ Age minimum
const getAgeMin = async () => {
  return await Candidat.min('age');
};

// ✅ Age maximum
const getAgeMax = async () => {
  return await Candidat.max('age');
};

// ✅ Age moyen
const getAgeMoyen = async () => {
  const result = await Candidat.findAll({
    attributes: [[fn('AVG', col('age')), 'age_moyen']],
    raw: true,
  });
  return parseFloat(result[0].age_moyen);
};

// ✅ Nombre de candidats par tranches d'âge
const countByAgeTranche = async (minAge, maxAge, id_unite = null) => {
  const whereClause = {
    age: {
      [Op.gte]: minAge,
      [Op.lte]: maxAge,
    },
  };
  
  if (id_unite) {
    whereClause.id_unite = id_unite;
  }
  
  return await Candidat.count({
    where: whereClause,
  });
};

// ✅ Nombre de candidats par ville
const countByVille = async () => {
  return await Candidat.findAll({
    attributes: ['ville', [fn('COUNT', col('id_candidat')), 'total']],
    group: ['ville'],
    raw: true,
  });
};

// ✅ Nombre de candidats homme vs femme
const countByGenre = async () => {
  return await Candidat.findAll({
    attributes: ['genre', [fn('COUNT', col('id_candidat')), 'total']],
    group: ['genre'],
    raw: true,
  });
};

const countByLangues = async () => {
  try {
    const query = `
      SELECT COUNT(*)::int AS "2_langues"
      FROM (
        SELECT c.id_candidat
        FROM candidats c
        JOIN langue_tiers lt ON c.id_tiers = lt.id_tiers
        GROUP BY c.id_candidat
        HAVING COUNT(lt.id_langue) = 2
      ) AS sub;
    `;

    const result = await pool.query(query);
    return (result && result.rows && result.rows[0]);
  } catch (error) {
    console.error('Erreur countByLangues2:', error);
    return 0;
  }
};

// ===== NOUVELLES FONCTIONS POUR STATISTIQUES PAR UNITE =====

// Nombre total de candidatures pour une unité
const countCandidaturesByUnite = async (id_unite) => {
  try {
    const query = `
      SELECT COUNT(*)::int as total_candidatures
      FROM candidats c
      JOIN annonces a ON c.id_annonce = a.id_annonce
      WHERE a.id_unite = $1;
    `;
    
    const result = await pool.query(query, [id_unite]);
    return result.rows[0]?.total_candidatures || 0;
  } catch (error) {
    console.error('Erreur countCandidaturesByUnite:', error);
    return 0;
  }
};

// Age minimum pour une unité
const getAgeMinByUnite = async (id_unite) => {
  try {
    const query = `
      SELECT MIN(EXTRACT(YEAR FROM AGE(t.date_naissance))) as age_min
      FROM candidats c
      JOIN tiers t ON c.id_tiers = t.id_tiers
      JOIN annonces a ON c.id_annonce = a.id_annonce
      WHERE a.id_unite = $1;
    `;
    
    const result = await pool.query(query, [id_unite]);
    return result.rows[0]?.age_min || 0;
  } catch (error) {
    console.error('Erreur getAgeMinByUnite:', error);
    return 0;
  }
};

// Age maximum pour une unité
const getAgeMaxByUnite = async (id_unite) => {
  try {
    const query = `
      SELECT MAX(EXTRACT(YEAR FROM AGE(t.date_naissance))) as age_max
      FROM candidats c
      JOIN tiers t ON c.id_tiers = t.id_tiers
      JOIN annonces a ON c.id_annonce = a.id_annonce
      WHERE a.id_unite = $1;
    `;
    
    const result = await pool.query(query, [id_unite]);
    return result.rows[0]?.age_max || 0;
  } catch (error) {
    console.error('Erreur getAgeMaxByUnite:', error);
    return 0;
  }
};

// Age moyen pour une unité
const getAgeMoyenByUnite = async (id_unite) => {
  try {
    const query = `
      SELECT AVG(EXTRACT(YEAR FROM AGE(t.date_naissance))) as age_moyen
      FROM candidats c
      JOIN tiers t ON c.id_tiers = t.id_tiers
      JOIN annonces a ON c.id_annonce = a.id_annonce
      WHERE a.id_unite = $1;
    `;
    
    const result = await pool.query(query, [id_unite]);
    return parseFloat(result.rows[0]?.age_moyen) || 0;
  } catch (error) {
    console.error('Erreur getAgeMoyenByUnite:', error);
    return 0;
  }
};

// Candidats par tranches d'âge prédéfinies pour une unité
const countByAgeRanges = async (id_unite) => {
  try {
    const query = `
      SELECT 
        CASE 
          WHEN EXTRACT(YEAR FROM AGE(t.date_naissance)) BETWEEN 18 AND 25 THEN '18-25 ans'
          WHEN EXTRACT(YEAR FROM AGE(t.date_naissance)) BETWEEN 26 AND 35 THEN '26-35 ans'
          WHEN EXTRACT(YEAR FROM AGE(t.date_naissance)) BETWEEN 36 AND 45 THEN '36-45 ans'
          WHEN EXTRACT(YEAR FROM AGE(t.date_naissance)) BETWEEN 46 AND 55 THEN '46-55 ans'
          ELSE '55+ ans'
        END as tranche_age,
        COUNT(*)::int as total
      FROM candidats c
      JOIN tiers t ON c.id_tiers = t.id_tiers
      JOIN annonces a ON c.id_annonce = a.id_annonce
      WHERE a.id_unite = $1
      GROUP BY 
        CASE 
          WHEN EXTRACT(YEAR FROM AGE(t.date_naissance)) BETWEEN 18 AND 25 THEN '18-25 ans'
          WHEN EXTRACT(YEAR FROM AGE(t.date_naissance)) BETWEEN 26 AND 35 THEN '26-35 ans'
          WHEN EXTRACT(YEAR FROM AGE(t.date_naissance)) BETWEEN 36 AND 45 THEN '36-45 ans'
          WHEN EXTRACT(YEAR FROM AGE(t.date_naissance)) BETWEEN 46 AND 55 THEN '46-55 ans'
          ELSE '55+ ans'
        END
      ORDER BY tranche_age;
    `;
    
    const result = await pool.query(query, [id_unite]);
    return result.rows;
  } catch (error) {
    console.error('Erreur countByAgeRanges:', error);
    return [];
  }
};

// Candidats par ville pour une unité
const countByVilleByUnite = async (id_unite) => {
  try {
    const query = `
      SELECT v.valeur as ville, COUNT(*)::int as total
      FROM candidats c
      JOIN annonces a ON c.id_annonce = a.id_annonce
      JOIN tiers t ON c.id_tiers = t.id_tiers
      JOIN villes v ON t.id_ville = v.id_ville
      WHERE a.id_unite = $1
      GROUP BY v.valeur
      ORDER BY total DESC;
    `;
    
    const result = await pool.query(query, [id_unite]);
    return result.rows;
  } catch (error) {
    console.error('Erreur countByVilleByUnite:', error);
    return [];
  }
};

// Candidats par genre pour une unité
const countByGenreByUnite = async (id_unite) => {
  try {
    const query = `
      SELECT g.valeur as genre, COUNT(*)::int as total
      FROM candidats c
      JOIN annonces a ON c.id_annonce = a.id_annonce
      JOIN tiers t ON c.id_tiers = t.id_tiers
      JOIN genres g ON t.id_genre = g.id_genre
      WHERE a.id_unite = $1
      GROUP BY g.valeur
      ORDER BY total DESC;
    `;
    
    const result = await pool.query(query, [id_unite]);
    return result.rows;
  } catch (error) {
    console.error('Erreur countByGenreByUnite:', error);
    return [];
  }
};

module.exports = {
  getAgeMin,
  getAgeMax,
  getAgeMoyen,
  countByAgeTranche,
  countByVille,
  countByGenre,
  countByLangues,
  // Nouvelles fonctions par unité
  countCandidaturesByUnite,
  getAgeMinByUnite,
  getAgeMaxByUnite,
  getAgeMoyenByUnite,
  countByAgeRanges,
  countByVilleByUnite,
  countByGenreByUnite
};