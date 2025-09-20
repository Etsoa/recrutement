const CeoView = require('../models/ceoViewModel');
const CeoSuggestions = require('../models/ceoSuggestionsModel');

const loginCeo = async (email, mot_de_passe) => {
    const type_status_employe = 'Actif';
    const whereClause = {
        email,
        mot_de_passe,
        type_status_employe
    }

    return await CeoView.findOne({ where: whereClause });
};

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

module.exports = {
    loginCeo
}