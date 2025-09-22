const UniteEntretien = require('../models/uniteEntretiensModel');
const UniteEntretiensView = require('../models/uniteEntretiensViewModel');
const RhSuggestions = require('../models/rhSuggestionsModel');
const StatusRhSuggestions = require('../models/statusRhSuggestionsModel');
const { Op } = require('sequelize');

// Créer un nouvel entretien
const createUniteEntretien = async (data) => {
  return await UniteEntretien.create(data);
};

// Récupérer tous les entretiens
const getAllUniteEntretiens = async () => {
  return await UniteEntretien.findAll();
};

// Récupérer un entretien par ID
const getUniteEntretienById = async (id) => {
  return await UniteEntretien.findByPk(id);
};

// Mettre à jour un entretien
const updateUniteEntretien = async (id, data) => {
  return await UniteEntretien.update(data, { where: { id_unite_entretien: id } });
};

// Supprimer un entretien
const deleteUniteEntretien = async (id) => {
  return await UniteEntretien.destroy({ where: { id_unite_entretien: id } });
};

// exports.getAllEntretiensParJour = async (date) => {
//   try {
//       const query = `
//           SELECT ue.*, c.nom as nom_candidat, c.prenom as prenom_candidat,
//           u.nom as nom_unite, u.id as id_unite
//           FROM unite_entretien ue
//           JOIN candidat c ON ue.id_candidat = c.id
//           JOIN unite u ON ue.id_unite = u.id
//           WHERE DATE(ue.date_entretien) = DATE(?)
//           ORDER BY ue.date_entretien ASC
//       `;
//       const [entretiens] = await db.query(query, [date]);
//       return entretiens;
//   } catch (error) {
//       throw error;
//   }
// };



const getAllEntretiensParJour = async (day) => {
  try {
    const entretiens = await RhEntretiensView.findAll({
      where: {
        date_entretien: {
          [Op.between]: [`${day} 00:00:00`, `${day} 23:59:59`]
        }
      },
      order: [['date_entretien', 'ASC']]
    });
    return entretiens;
  } catch (err) {
    console.error('Erreur dans getAllEntretiensParJour:', err);
    throw err;
  }
};

const suggestToRh = async ({ id_unite_entretien, id_candidat, id_type_status_suggestion = 3 }) => {
  if (!id_unite_entretien || !id_candidat) {
    throw new Error('id_unite_entretien et id_candidat sont requis');
  }

  // Créer la suggestion
  const suggestion = await RhSuggestions.create({
    id_unite_entretien,
    id_candidat,
    id_type_status_suggestion,
    date_suggestion: new Date()
  });

  // Optionnel: créer le statut initial
  await StatusRhSuggestions.create({
    id_rh_suggestion: suggestion.id_rh_suggestion,
    id_type_status_suggestion,
    date_changement: new Date()
  });

  return suggestion;
};

const getAllRhSuggestions = async () => {
  const suggestions = await RhSuggestions.findAll({
    include: [
      {
        model: RhEntretien,
        as: 'RhEntretien',
        attributes: ['id_rh_entretien', 'date_entretien', 'duree']
      },
      {
        model: Candidats,
        as: 'Candidat',
        include: [
          {
            model: Tiers,
            as: 'Tier',
            attributes: ['nom', 'prenom', 'email']
          }
        ]
      },
      {
        model: StatusRhSuggestions,
        as: 'StatusRhSuggestions', // ⚡ alias pour association
        include: [
          {
            model: TypeStatusSuggestions,
            as: 'TypeStatusSuggestion',
            attributes: ['valeur']
          }
        ],
        attributes: ['date_changement']
      }
    ],
    order: [['date_suggestion', 'DESC']]
  });

  return suggestions;
};

module.exports = {
  createUniteEntretien,
  getAllUniteEntretiens,
  getUniteEntretienById,
  updateUniteEntretien,
  deleteUniteEntretien, 
  getAllEntretiensParJour, 
  suggestToRh, 
  getAllRhSuggestions
};
