const CeoView = require('../models/ceoViewModel');
const CeoSuggestions = require('../models/ceoSuggestionsModel');
const RhEntretien = require('../models/rhEntretiensModel');
const Candidats = require('../models/candidatsModel');
const Tiers = require('../models/tiersModel');
const CeoEmployesView = require('../models/ceoEmployesViewModel');
const ContratEssai = require('../models/contratEssaisModel');

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
  const employes = await CeoEmployesView.findAll({
    include: [
      {
        model: ContratEssai,
        attributes: ["id_contrat_essai", "date_debut", "duree"]
      }
    ]
  });
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

const refuserSuggestion = async (id_ceo_suggestion) => {
  try {
    const suggestion = await CeoSuggestions.findByPk(id_ceo_suggestion);

    if (!suggestion) {
      return {
        success: false,
        message: "Suggestion introuvable"
      };
    }

    // Mise à jour du statut à 2 (refusé)
    await suggestion.update({ id_type_status_suggestion: 2 });

    return {
      success: true,
      message: "Suggestion refusée avec succès"
    };
  } catch (error) {
    console.error("Erreur refuserSuggestion:", error);
    return {
      success: false,
      message: "Erreur lors du refus de la suggestion",
      error: error.message
    };
  }
}

module.exports = {
  loginCeo,
  getAllSuggests,
  getAllEmployes,
  getAllSuggestsWaitingValidation,
  refuserSuggestion
}