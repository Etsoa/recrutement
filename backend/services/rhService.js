const RhView = require('../models/rhViewModel');
const RhSuggestions = require('../models/rhSuggestionsModel');
const UniteEntretiens = require('../models/uniteEntretiensModel');
const Candidats = require('../models/candidatsModel');
const Tiers = require('../models/tiersModel');
const Unites = require('../models/unitesModel');

const RhEntretien = require('../models/rhEntretiensModel');
const StatusRhEntretien = require('../models/statusRhEntretiensModel');

const RhEntretiensView = require('../models/rhEntretiensViewModel');
const { Op } = require('sequelize');

const ScoreRhEntretien = require('../models/scoreRhEntretiensModel'); // Assure-toi que le modèle existe

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

const createRhEntretien = async ({ id_rh_suggestion, id_candidat, date_entretien, duree }) => {
  try {
    // Étape 1 : créer l’entretien
    const entretien = await RhEntretien.create({
      id_rh_suggestion,
      id_candidat,
      date_entretien,
      duree
    });

    // Étape 2 : statut par défaut "à venir" (id = 1)
    await StatusRhEntretien.create({
      id_rh_entretien: entretien.id_rh_entretien,
      id_type_status_entretien: 1,
      date_changement: new Date()
    });

    // Étape 3 : retour cohérent avec tes autres services
    return entretien;
  } catch (err) {
    console.error("Erreur dans createRhEntretien:", err);
    throw err;
  }
};

const getEntretiensParJour = async (day) => {
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
    console.error('Erreur dans getEntretiensParJour:', err);
    throw err;
  }
};

const updateDateRhEntretien = async (id_rh_entretien, nouvelle_date) => {
  const entretien = await RhEntretien.findByPk(id_rh_entretien);
  if (!entretien) throw new Error('Entretien non trouvé');

  entretien.date_entretien = nouvelle_date;
  await entretien.save();

  return entretien;
};

const updateStatusRhEntretien = async (id_rh_entretien, id_type_status_entretien) => {
  const entretien = await RhEntretien.findByPk(id_rh_entretien);
  if (!entretien) return null;

  const status = await StatusRhEntretien.create({
    id_rh_entretien,
    id_type_status_entretien,
    date_changement: new Date()
  });

  return status;
};

// Obtenir créneaux disponibles pour une date
const getDisponibilitesRh = async (id_rh, date) => {
  // Créneaux possibles de 8h à 16h, toutes les heures
  const horaires = [];
  for (let h = 8; h <= 16; h++) {
    horaires.push(`${h}:00`);
  }

  // Récupérer les entretiens existants pour ce RH ce jour-là
  const existants = await RhEntretien.findAll({
    where: {
      id_rh_suggestion: id_rh,
      date_entretien: {
        [Op.between]: [`${date} 08:00:00`, `${date} 16:00:00`]
      }
    }
  });

  const horairesPrises = existants.map(e => new Date(e.date_entretien).getHours() + ':00');

  // Retirer les horaires déjà pris
  const disponibles = horaires.filter(h => !horairesPrises.includes(h));

  return disponibles;
};

// Mettre à jour le statut
const updateDateStatusRhEntretien = async (id_rh_entretien, id_type_status_entretien) => {
  const entretien = await RhEntretien.findByPk(id_rh_entretien);
  if (!entretien) throw new Error('Entretien non trouvé');

  const status = await StatusRhEntretien.create({
    id_rh_entretien,
    id_type_status_entretien,
    date_changement: new Date()
  });

  return status;
};

const getProchaineDisponibilite = async (id_rh, date_depart) => {
  const startDate = new Date(date_depart);

  for (let dayOffset = 0; dayOffset < 30; dayOffset++) { // 30 prochains jours max
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayOffset);

    const dayOfWeek = date.getDay(); // 0 = dimanche, 6 = samedi
    if (dayOfWeek === 0 || dayOfWeek === 6) continue; // ignorer le week-end

    const dateStr = date.toISOString().split('T')[0];

    // récupérer les horaires libres pour ce jour
    const horairesLibres = await getDisponibilitesRh(id_rh, dateStr);
    if (horairesLibres.length > 0) {
      return `${dateStr} ${horairesLibres[0]}:00`; // renvoyer juste 1 créneau
    }
  }

  return null; // aucune dispo trouvée
};

const createScoreRhEntretien = async ({ id_rh_entretien, score, date_score }) => {
  if (!id_rh_entretien || score == null) {
    throw new Error('id_rh_entretien et score sont obligatoires');
  }

  const scoreDate = date_score ? new Date(date_score) : new Date();

  const nouveauScore = await ScoreRhEntretien.create({
    id_rh_entretien,
    score,
    date_score: scoreDate
  });

  return nouveauScore;
};

module.exports = {
  loginRh,
  getAllSuggests,
  createRhEntretien,
  getEntretiensParJour, 
  updateDateRhEntretien,
  updateStatusRhEntretien, 
  getDisponibilitesRh,
  updateDateStatusRhEntretien, 
  getProchaineDisponibilite, 
  createScoreRhEntretien
};
