const RhView = require('../models/rhViewModel');
// const RhSuggestions = require('../models/rhSuggestionsModel');
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


const JoursFeries = require('../models/joursFeriesModel');
const HorairesOuvres = require('../models/horairesOuvresModel');
const { RhSuggestions, StatusRhSuggestion, TypeStatusSuggestion } = require('../models/rhAssociations');
const ScoreUniteEntretien = require('../models/scoreUniteEntretiensModel'); // ← manquait


const getAllSuggests = async () => {
  try {
    const suggestions = await RhSuggestions.findAll({
      include: [
        {
          model: UniteEntretiens,
          as: 'entretien',
          include: [
            {
              model: Unites,
              as: 'unite',
              attributes: ['id_unite', 'nom']
            },
            {
              model: ScoreUniteEntretien,
              as: 'scores',
              attributes: ['score', 'date_score'],
              separate: true,
              order: [['date_score', 'DESC']],
              limit: 1
            }
          ]
        },
        {
          model: Candidats,
          as: 'candidat',
          include: [
            {
              model: Tiers,
              as: 'Tier',
              attributes: ['nom', 'prenom', 'email']
            }
          ]
        },
        {
          model: StatusRhSuggestion,
          as: 'status',
          include: [
            {
              model: TypeStatusSuggestion,
              as: 'typeStatus',
              attributes: ['valeur']
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

const getAllAnnonces = async () => {
  try {
    // 1) Récupérer toutes les annonces avec leurs dépendances
    const allAnnonces = await Annonces.findAll({
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

    // 2) Récupérer le dernier statut pour chaque annonce (visible par défaut si 1=En cours de demande ou 2=Publie)
    const allowedStatusIds = [1, 2, 3, 4];
    const results = [];

    for (const annonce of allAnnonces) {
      const lastStatus = await StatusAnnonces.findOne({
        where: { id_annonce: annonce.id_annonce },
        order: [['date_changement', 'DESC']],
        limit: 1
      });

      if (lastStatus) {
        annonce.dataValues.currentStatus = lastStatus;
        if (allowedStatusIds.includes(lastStatus.id_type_status_annonce)) {
          results.push(annonce);
        }
      }
    }

    return results;
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

// Créer une annonce RH avec statut = 2 (validée par RH)
const createAnnonceRh = async (annonceData) => {
  try {
    // Créer l'annonce
    const newAnnonce = await Annonces.create(annonceData);
    
    // Créer automatiquement le statut = 2 (validée par RH)
    await StatusAnnonces.create({
      id_annonce: newAnnonce.id_annonce,
      id_type_status_annonce: 2, // Validée par RH
      date_changement: new Date()
    });
    
    return newAnnonce;
  } catch (err) {
    console.error('Erreur lors de la création de l\'annonce RH:', err);
    throw err;
  }
};

const createRhEntretien = async ({ id_rh_suggestion, id_candidat, date_entretien, duree }) => {
  try {
    // S'assurer que la date est au bon format
    const formattedDate = new Date(date_entretien).toISOString();
    
    const entretien = await RhEntretien.create({
      id_rh_suggestion,
      id_candidat,
      date_entretien: formattedDate,
      duree
    });

    await StatusRhEntretien.create({
      id_rh_entretien: entretien.id_rh_entretien,
      id_type_status_entretien: 1,
      date_changement: new Date()
    });

    return {
      success: true,
      data: entretien
    };
  } catch (err) {
    console.error("Erreur dans createRhEntretien:", err);
    return {
      success: false,
      message: err.message
    };
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

// // Obtenir créneaux disponibles pour une date
// const getDisponibilitesRh = async (id_rh, date) => {
//   // Créneaux possibles de 8h à 16h
//   const horaires = [];
//   for (let h = 8; h <= 16; h++) {
//     horaires.push(`${h}:00`);
//   }

//   // Récupérer les entretiens existants pour ce RH ce jour-là
//   const existants = await RhEntretien.findAll({
//     where: {
//       id_rh_suggestion: id_rh,
//       date_entretien: {
//         [Op.between]: [`${date} 08:00:00`, `${date} 16:00:00`]
//       }
//     }
//   });

//   // Extraire l'heure locale correctement
//   const horairesPrises = existants.map(e => {
//     // Convertir en string si c'est un Date
//     let dateStr;
//     if (e.date_entretien instanceof Date) {
//       dateStr = e.date_entretien.toLocaleString('fr-FR', { hour12: false });
//     } else {
//       dateStr = e.date_entretien; // déjà string depuis la base
//     }
//     const heure = parseInt(dateStr.split(' ')[1].split(':')[0], 10);
//     return `${heure}:00`;
//   });

//   // Retirer les créneaux déjà pris
//   const disponibles = horaires.filter(h => !horairesPrises.includes(h));

//   return disponibles;
// };

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

// const getProchaineDisponibilite = async (id_rh, date_depart) => {
//   const startDate = new Date(date_depart);

//   for (let dayOffset = 0; dayOffset < 30; dayOffset++) { // 30 prochains jours max
//     const date = new Date(startDate);
//     date.setDate(date.getDate() + dayOffset);

//     const dayOfWeek = date.getDay(); // 0 = dimanche, 6 = samedi
//     if (dayOfWeek === 0 || dayOfWeek === 6) continue; // ignorer le week-end

//     const dateStr = date.toISOString().split('T')[0];

//     // récupérer les horaires libres pour ce jour
//     const horairesLibres = await getDisponibilitesRh(id_rh, dateStr);
//     if (horairesLibres.length > 0) {
//       return `${dateStr} ${horairesLibres[0]}:00`; // renvoyer juste 1 créneau
//     }
//   }

//   return null; // aucune dispo trouvée
// };

const getDisponibilitesRh = async (id_rh, date) => {
  const horairesOuvres = await getHorairesOuvres();
  const horaires = [];
  
  horairesOuvres.forEach(h => {
    const debut = parseInt(h.heure_debut.split(':')[0], 10);
    const fin = parseInt(h.heure_fin.split(':')[0], 10);
    for (let hInt = debut; hInt < fin; hInt++) {
      // Format avec padding pour les heures
      horaires.push(`${String(hInt).padStart(2, '0')}:00`);
    }
  });

  // Dédupliquer et trier les créneaux (en cas de doublons dans horaires_ouvres)
  const uniqueHoraires = Array.from(new Set(horaires)).sort();

  // Si aucun horaire ouvert, rien à proposer
  if (uniqueHoraires.length === 0) return [];

  const existants = await RhEntretien.findAll({
    where: {
      id_rh_suggestion: id_rh,
      date_entretien: {
        [Op.between]: [
          `${date} ${uniqueHoraires[0]}`,
          `${date} ${uniqueHoraires[uniqueHoraires.length-1]}`
        ]
      }
    }
  });

  const horairesPrises = existants.map(e => {
    const date = new Date(e.date_entretien);
    return `${String(date.getHours()).padStart(2, '0')}:00`;
  });

  // Dédupliquer les heures prises au cas où
  const prisesSet = new Set(horairesPrises);
  return uniqueHoraires.filter(h => !prisesSet.has(h));
}; 

const getProchaineDisponibilite = async (id_rh, date_depart) => {
  const startDate = new Date(date_depart);
  const joursFeries = (await getJoursFeries()).map(j => j.date_ferie);

  for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayOffset);

    const dayOfWeek = date.getDay(); // 0 = dimanche, 6 = samedi
    const dateStr = date.toISOString().split('T')[0];

    // ignorer week-end ou jour férié
    if (dayOfWeek === 0 || dayOfWeek === 6 || joursFeries.includes(dateStr)) continue;

    const horairesLibres = await getDisponibilitesRh(id_rh, dateStr);
    if (horairesLibres.length > 0) {
      return `${dateStr} ${horairesLibres[0]}:00`;
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

const getJoursFeries = async () => {
  return await JoursFeries.findAll({ order: [['date_ferie', 'ASC']] });
};

const getHorairesOuvres = async () => {
  return await HorairesOuvres.findAll({ order: [['heure_debut', 'ASC']] });
};


const createStatusSuggestion = async ({ id_rh_suggestion, id_type_status_suggestion, date_changement }) => {
  const status = await StatusRhSuggestion.create({
    id_rh_suggestion,
    id_type_status_suggestion,
    date_changement: date_changement || new Date()
  });
  return status;
};

module.exports = {
  loginRh,
  getAllSuggests,
  createRhEntretien,
  getEntretiensParJour, 
  getEntretiensParMois,
  createStatusSuggestion,
  updateDateRhEntretien,
  updateStatusRhEntretien, 
  getDisponibilitesRh,
  updateDateStatusRhEntretien, 
  getProchaineDisponibilite, 
  createScoreRhEntretien,
  suggestToCeo,
  getAllCeoSuggestions,
  getAllAnnonces,
  updateAnnonceStatus,
  createAnnonceRh, 
  getJoursFeries, 
  getHorairesOuvres
};
