const CeoView = require('../models/ceoViewModel');
const CeoSuggestions = require('../models/ceoSuggestionsModel');
const RhEntretien = require('../models/rhEntretiensModel');
const Candidats = require('../models/candidatsModel');
const Tiers = require('../models/tiersModel');
const CeoEmployesView = require('../models/ceoEmployesViewModel');

const loginCeo = async (email, mot_de_passe) => {
  const type_status_employe = 'Actif';
  const whereClause = {
    email,
    mot_de_passe,
    type_status_employe
  }

  return await CeoView.findOne({ where: whereClause });
};

// Afaka atsaraina ampiana kokoa ilay info an'le Tiers
const getAllSuggests = async () => {
  const suggestions = await CeoSuggestions.findAll({
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
      }
    ],
    order: [['date_suggestion', 'DESC']]
  });


  return suggestions;
};

const getAllEmployes = async () => {
  const employes = await CeoEmployesView.findAll();
  return employes;
}

const getAllSuggestsWaitingValidation = async () => {
  const suggestions = await CeoSuggestions.findAll({
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
      }
    ],
    order: [['date_suggestion', 'DESC']],
    where: { id_type_status_suggestion: 3 } // Ito no important sy mila jerena hoe 3 tokoa ve ny en attente
  });


  return suggestions;
};

module.exports = {
  loginCeo,
  getAllSuggests,
  getAllEmployes,
  getAllSuggestsWaitingValidation
}