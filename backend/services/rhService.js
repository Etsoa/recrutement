const RhView = require('../models/rhViewModel');
const RhSuggestions = require('../models/rhSuggestionsModel');
const UniteEntretiens = require('../models/uniteEntretiensModel');
const Candidats = require('../models/candidatsModel');
const StatusAnnonces = require('../models/statusAnnoncesModel');
const Tiers = require('../models/tiersModel');
const Unites = require('../models/unitesModel');

const RhEntretien = require('../models/rhEntretiensModel');
const StatusRhEntretien = require('../models/statusRhEntretiensModel');

const RhEntretiensView = require('../models/rhEntretiensViewModel');
const { Op } = require('sequelize');

const ScoreRhEntretien = require('../models/scoreRhEntretiensModel'); 

const CeoSuggestions = require('../models/ceoSuggestionsModel');

const StatusCeoSuggestions = require('../models/statusCeoSuggestionsModel');
const TypeStatusSuggestions = require('../models/typeStatusSuggestionsModel');
const Annonces = require('../models/annoncesModel');
const Postes = require('../models/postesModel');
const Villes = require('../models/villesModel');
const Genres = require('../models/genresModel');
const NiveauFiliereAnnonces = require('../models/niveauFiliereAnnoncesModel');
const Filieres = require('../models/filieresModel');
const Niveaux = require('../models/niveauxModel');
const LangueAnnonces = require('../models/langueAnnoncesModel');
const Langues = require('../models/languesModel');
const QualiteAnnonces = require('../models/qualiteAnnoncesModel');
const Qualites = require('../models/qualitesModel');
const ExperienceAnnonces = require('../models/experienceAnnoncesModel');
const Domaines = require('../models/domainesModel');

const getAllAnnonces = async () => {
  try {
    const annonces = await Annonces.findAll({
      include: [
        { model: Postes, as: 'Poste', include: [{ model: Unites, as: 'Unite', attributes: ['id_unite', 'nom'] }] },
        { model: Villes, as: 'Ville', attributes: ['id_ville', 'valeur'] },
        { model: Genres, as: 'Genre', attributes: ['id_genre', 'valeur'] },
        { model: NiveauFiliereAnnonces, as: 'niveauFiliereAnnonces', include: [
            { model: Filieres, as: 'Filiere', attributes: ['id_filiere', 'valeur'] },
            { model: Niveaux, as: 'Niveau', attributes: ['id_niveau', 'valeur'] }
          ] 
        },
        { model: LangueAnnonces, as: 'Langues', include: [{ model: Langues, as: 'Langue', attributes: ['id_langue', 'valeur'] }] },
        { model: QualiteAnnonces, as: 'Qualites', include: [{ model: Qualites, as: 'Qualite', attributes: ['id_qualite', 'valeur'] }] },
        { model: ExperienceAnnonces, as: 'Experiences', include: [{ model: Domaines, as: 'Domaine', attributes: ['id_domaine', 'valeur'] }] }
      ]
    });

    return annonces;
  } catch (err) {
    console.error('Erreur getAllAnnonces:', err);
    throw err;
  }
};


const loginRh = async (email, mot_de_passe) => {
  return await RhView.findOne({ where: { email, mot_de_passe } });
};

const updateAnnonceStatus = async ({ id_annonce, id_type_status_annonce, id_unite, date_changement }) => {
  try {
    const status = await StatusAnnonces.create({
      id_annonce,
      id_type_status_annonce,
      id_unite,
      date_changement: date_changement || new Date()
    });
    return status;
  } catch (err) {
    console.error('Erreur lors de la mise à jour du statut de l\'annonce:', err);
    throw err;
  }
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
              as: 'Tier', // alias à vérifier dans Candidats
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

const getEntretiensParMois = async (start, end) => {
  try {
    const entretiens = await RhEntretiensView.findAll({
      where: {
        date_entretien: {
          [Op.between]: [start + ' 00:00:00', end + ' 23:59:59']
        }
      },
      order: [['date_entretien', 'ASC']]
    });
    return entretiens;
  } catch (err) {
    console.error('Erreur dans getEntretiensParMois:', err);
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
  // Créneaux possibles de 8h à 16h
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

  // Extraire l'heure locale correctement
  const horairesPrises = existants.map(e => {
    // Convertir en string si c'est un Date
    let dateStr;
    if (e.date_entretien instanceof Date) {
      dateStr = e.date_entretien.toLocaleString('fr-FR', { hour12: false });
    } else {
      dateStr = e.date_entretien; // déjà string depuis la base
    }
    const heure = parseInt(dateStr.split(' ')[1].split(':')[0], 10);
    return `${heure}:00`;
  });

  // Retirer les créneaux déjà pris
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

const suggestToCeo = async ({ id_rh_entretien, id_candidat, id_type_status_suggestion = 3 }) => {
  if (!id_rh_entretien || !id_candidat) {
    throw new Error('id_rh_entretien et id_candidat sont requis');
  }

  // Créer la suggestion
  const suggestion = await CeoSuggestions.create({
    id_rh_entretien,
    id_candidat,
    id_type_status_suggestion,
    date_suggestion: new Date()
  });

  // Optionnel: créer le statut initial
  await StatusCeoSuggestions.create({
    id_ceo_suggestion: suggestion.id_ceo_suggestion,
    id_type_status_suggestion,
    date_changement: new Date()
  });

  return suggestion;
};

const getAllCeoSuggestions = async () => {
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
      },
      {
        model: StatusCeoSuggestions,
        as: 'StatusCeoSuggestions', // ⚡ alias pour association
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
  loginRh,
  getAllSuggests,
  createRhEntretien,
  getEntretiensParJour, 
  getEntretiensParMois,
  updateDateRhEntretien,
  updateStatusRhEntretien, 
  getDisponibilitesRh,
  updateDateStatusRhEntretien, 
  getProchaineDisponibilite, 
  createScoreRhEntretien,
  suggestToCeo,
  getAllCeoSuggestions,
  getAllAnnonces,
  updateAnnonceStatus
};
