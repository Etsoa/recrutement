// services/candidatService.js
const Candidat = require('../../models/viewCandidatsModel');
const pool = require('../../config/db'); 
const { Op, fn, col, literal } = require('sequelize'); // ✅ à importer

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

// ✅ Nombre de candidats par tranches d’âge
const countByAgeTranche = async (minAge, maxAge) => {
  return await Candidat.count({
    where: {
      age: {
        [Op.gte]: minAge,
        [Op.lte]: maxAge,
      },
    },
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
      SELECT
        SUM(CASE WHEN langues_count = 2 THEN 1 ELSE 0 END) AS "2_langues",
        SUM(CASE WHEN langues_count = 3 THEN 1 ELSE 0 END) AS "3_langues",
        SUM(CASE WHEN langues_count > 4 THEN 1 ELSE 0 END) AS "plus_4_langues"
      FROM (
        SELECT c.id_candidat, COUNT(lt.id_langue) AS langues_count
        FROM candidats c
        JOIN tiers t ON c.id_tiers = t.id_tiers
        JOIN langue_tiers lt ON t.id_tiers = lt.id_tiers
        GROUP BY c.id_candidat
      ) AS sub;
    `;

    const result = await pool.query(query);

    // ⚡ Vérification avant d'accéder à [0]
    if (!result || !result.rows || result.rows.length === 0) {
      return { '2_langues': 0, '3_langues': 0, 'plus_4_langues': 0 };
    }

    return result.rows[0];
  } catch (error) {
    console.error('Erreur countByLangues:', error);
    return { '2_langues': 0, '3_langues': 0, 'plus_4_langues': 0 };
  }
};



const countByNiveau = async () => {
  const query = `
    SELECT n.nom_niveau, COUNT(DISTINCT c.id_candidat) AS nbr_candidats
    FROM candidats c
    JOIN niveau_filiere_annonces nfa ON c.id_annonce = nfa.id_annonce
    JOIN niveaux n ON nfa.id_niveau = n.id_niveau
    GROUP BY n.nom_niveau;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

const countByExperience = async () => {
  const query = `
    SELECT
      CASE
        WHEN SUM(ea.nombre_annee) BETWEEN 1 AND 3 THEN '1-3 ans'
        WHEN SUM(ea.nombre_annee) BETWEEN 4 AND 6 THEN '4-6 ans'
        WHEN SUM(ea.nombre_annee) BETWEEN 7 AND 9 THEN '7-9 ans'
        ELSE '+10 ans'
      END AS tranche_experience,
      COUNT(DISTINCT c.id_candidat) AS nbr_candidats
    FROM candidats c
    JOIN experience_annonces ea ON c.id_annonce = ea.id_annonce
    GROUP BY
      CASE
        WHEN SUM(ea.nombre_annee) BETWEEN 1 AND 3 THEN '1-3 ans'
        WHEN SUM(ea.nombre_annee) BETWEEN 4 AND 6 THEN '4-6 ans'
        WHEN SUM(ea.nombre_annee) BETWEEN 7 AND 9 THEN '7-9 ans'
        ELSE '+10 ans'
      END;
  `;
  const { rows } = await pool.query(query);
  return rows;
};


module.exports = {
  getAgeMin,
  getAgeMax,
  getAgeMoyen,
  countByAgeTranche,
  countByVille,
  countByGenre,
  countByLangues,
  countByNiveau,
  countByExperience
};

