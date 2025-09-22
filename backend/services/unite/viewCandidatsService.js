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

module.exports = {
  getAgeMin,
  getAgeMax,
  getAgeMoyen,
  countByAgeTranche,
  countByVille,
  countByGenre,
  countByLangues
};

