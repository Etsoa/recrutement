const RhView = require('../models/rhViewModel');
const RhSuggestions = require('../models/rhSuggestionsModel');
const UniteEntretiens = require('../models/uniteEntretiensModel');
const Candidats = require('../models/candidatsModel');
const Tiers = require('../models/tiersModel');
const Unites = require('../models/unitesModel');

const loginRh = async (email) => {
  return await RhView.findOne({ where: { email } });
};

const getAllSuggests = async () => {
  try {
    const suggestions = await RhSuggestions.findAll({
      include: [
        {
          model: UniteEntretiens,
          as: 'entretien', // doit correspondre à l'alias dans le modèle
          include: [
            {
              model: Unites,
              as: 'unite', // alias à vérifier dans UniteEntretiens
              attributes: ['id_unite', 'nom']
            }
          ]
        },
        {
          model: Candidats,
          as: 'candidat', // idem
          include: [
            {
              model: Tiers,
              as: 'tiers', // alias à vérifier dans Candidats
              attributes: ['nom', 'prenom', 'email']
            }
          ]
        }
      ]
    });

    return suggestions;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { loginRh, getAllSuggests };
