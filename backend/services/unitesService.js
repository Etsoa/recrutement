const UniteEntretiens = require('../models/uniteEntretiensModel');
const UniteEntretiensView = require('../models/uniteEntretiensViewModel');
const Candidats = require('../models/candidatsModel');
const Tiers = require('../models/tiersModel');
const Unites = require('../models/unitesModel');
const Annonces = require('../models/annoncesModel');
const Postes = require('../models/postesModel');
const Villes = require('../models/villesModel');
const Genres = require('../models/genresModel');
const SituationMatrimoniales = require('../models/situationMatrimonialesModel');

const StatusUniteEntretiens = require('../models/statusUniteEntretiensModel');
const TypeStatusEntretiens = require('../models/typeStatusEntretiensModel');
const ScoreUniteEntretiens = require('../models/scoreUniteEntretiensModel');

const RhSuggestionsModel = require('../models/rhSuggestionsModel');
const { Op } = require('sequelize');

const JoursFeries = require('../models/joursFeriesModel');
const HorairesOuvres = require('../models/horairesOuvresModel');

const LangueTiers = require('../models/langueTiersModel');
const Langues = require('../models/languesModel');
const QualiteTiers = require('../models/qualiteTiersModel');
const Qualites = require('../models/qualitesModel');

/**
 * Obtenir tous les entretiens unité pour un mois donné
 */
const getEntretiensParMois = async (start, end, id_unite = null) => {
  try {
    let whereCondition = {
      date_entretien: {
        [Op.between]: [start + ' 00:00:00', end + ' 23:59:59']
      }
    };

    if (id_unite) {
      whereCondition.id_unite = id_unite;
    }

    const entretiens = await UniteEntretiensView.findAll({
      where: whereCondition,
      order: [['date_entretien', 'ASC']]
    });

    return entretiens;
  } catch (err) {
    console.error('Erreur dans getEntretiensParMois:', err);
    throw err;
  }
};

/**
 * Obtenir les entretiens unité pour une journée spécifique
 */
const getEntretiensParJour = async (day, id_unite = null) => {
  try {
    let whereCondition = {
      date_entretien: {
        [Op.between]: [`${day} 00:00:00`, `${day} 23:59:59`]
      }
    };

    if (id_unite) {
      whereCondition.id_unite = id_unite;
    }

    const entretiens = await UniteEntretiensView.findAll({
      where: whereCondition,
      order: [['date_entretien', 'ASC']]
    });

    return entretiens;
  } catch (err) {
    console.error('Erreur dans getEntretiensParJour:', err);
    throw err;
  }
};

/**
 * Créer un nouvel entretien unité
 */
const createUniteEntretien = async ({ id_candidat, id_unite, date_entretien, duree }) => {
  try {
    const formattedDate = new Date(date_entretien).toISOString();
    
    const entretien = await UniteEntretiens.create({
      id_candidat,
      id_unite,
      date_entretien: formattedDate,
      duree
    });

    // Créer le statut initial (1 = "Programmé")
    await StatusUniteEntretiens.create({
      id_unite_entretien: entretien.id_unite_entretien,
      id_type_status_entretien: 1,
      date_changement: new Date()
    });

    return {
      success: true,
      data: entretien
    };
  } catch (err) {
    console.error("Erreur dans createUniteEntretien:", err);
    return {
      success: false,
      message: err.message
    };
  }
};

/**
 * Mettre à jour le statut d'un entretien unité
 */
const updateStatusUniteEntretien = async (id_unite_entretien, id_type_status_entretien) => {
  try {
    const entretien = await UniteEntretiens.findByPk(id_unite_entretien);
    if (!entretien) return null;

    const status = await StatusUniteEntretiens.create({
      id_unite_entretien,
      id_type_status_entretien,
      date_changement: new Date()
    });

    return status;
  } catch (err) {
    console.error('Erreur updateStatusUniteEntretien:', err);
    throw err;
  }
};

/**
 * Créer un score pour un entretien unité
 */
const createScoreUniteEntretien = async ({ id_unite_entretien, score, date_score }) => {
  try {
    if (!id_unite_entretien || score == null) {
      throw new Error('id_unite_entretien et score sont obligatoires');
    }

    const scoreDate = date_score ? new Date(date_score) : new Date();

    const nouveauScore = await ScoreUniteEntretiens.create({
      id_unite_entretien,
      score,
      date_score: scoreDate
    });

    return nouveauScore;
  } catch (err) {
    console.error('Erreur createScoreUniteEntretien:', err);
    throw err;
  }
};

/**
 * Obtenir les créneaux disponibles pour une unité à une date donnée
 */
const getDisponibilitesUnite = async (id_unite, date) => {
  try {
    const horairesOuvres = await getHorairesOuvres();
    const horaires = [];
    
    horairesOuvres.forEach(h => {
      const debut = parseInt(h.heure_debut.split(':')[0], 10);
      const fin = parseInt(h.heure_fin.split(':')[0], 10);
      for (let hInt = debut; hInt < fin; hInt++) {
        horaires.push(`${String(hInt).padStart(2, '0')}:00`);
      }
    });

    const existants = await UniteEntretiens.findAll({
      where: {
        id_unite: id_unite,
        date_entretien: {
          [Op.between]: [
            `${date} ${horaires[0]}`,
            `${date} ${horaires[horaires.length-1]}`
          ]
        }
      }
    });

    const horairesPrises = existants.map(e => {
      const dateEntretien = new Date(e.date_entretien);
      return `${String(dateEntretien.getHours()).padStart(2, '0')}:00`;
    });

    return horaires.filter(h => !horairesPrises.includes(h));
  } catch (err) {
    console.error('Erreur getDisponibilitesUnite:', err);
    throw err;
  }
};

/**
 * Obtenir la prochaine disponibilité pour une unité
 */
const getProchaineDisponibilite = async (id_unite, date_depart) => {
  try {
    const startDate = new Date(date_depart);
    const joursFeries = (await getJoursFeries()).map(j => j.date_ferie);

    for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + dayOffset);

      const dayOfWeek = date.getDay();
      const dateStr = date.toISOString().split('T')[0];

      if (dayOfWeek === 0 || dayOfWeek === 6 || joursFeries.includes(dateStr)) continue;

      const horairesLibres = await getDisponibilitesUnite(id_unite, dateStr);
      if (horairesLibres.length > 0) {
        return `${dateStr} ${horairesLibres[0]}:00`;
      }
    }

    return null;
  } catch (err) {
    console.error('Erreur getProchaineDisponibilite:', err);
    throw err;
  }
};

/**
 * Obtenir les candidats éligibles pour suggestion au RH
 * (candidats avec entretien terminé et score >= 10, pas encore suggérés)
 */
const getCandidatsEligiblesPourRh = async (id_unite = null) => {
  try {
    // Construction de la requête avec les jointures nécessaires
    let whereCondition = {};
    if (id_unite) {
      whereCondition.id_unite = id_unite;
    }

    const candidats = await UniteEntretiens.findAll({
      where: whereCondition,
      include: [
        {
          model: Candidats,
          as: 'Candidat', // Correction de l'alias : 'candidat' -> 'Candidat'
          include: [
            {
              model: Tiers,
              as: 'Tier',
              include: [
                { model: Villes, as: 'Ville', attributes: ['valeur'] },
                { model: Genres, as: 'Genre', attributes: ['valeur'] },
                { model: SituationMatrimoniales, as: 'SituationMatrimoniale', attributes: ['valeur'] },
                {
                  model: LangueTiers,
                  as: 'langueTiers',
                  include: [{ model: Langues, as: 'Langue', attributes: ['valeur'] }]
                },
                {
                  model: QualiteTiers,
                  as: 'qualiteTiers',
                  include: [{ model: Qualites, as: 'Qualite', attributes: ['valeur'] }]
                }
              ]
            },
            {
              model: Annonces,
              as: 'Annonce',
              include: [
                {
                  model: Postes,
                  as: 'Poste',
                  include: [{ model: Unites, as: 'Unite', attributes: ['nom'] }]
                }
              ]
            }
          ]
        },
        {
          model: StatusUniteEntretiens,
          as: 'statusEntretiens',
          include: [
            { model: TypeStatusEntretiens, as: 'TypeStatusEntretien', attributes: ['valeur'] }
          ]
        },
        {
          model: ScoreUniteEntretiens,
          as: 'scores',
          attributes: ['score', 'date_score']
        }
      ]
    });

    // Filtrer les candidats éligibles côté application
    const candidatsEligibles = [];

    for (const entretien of candidats) {
      // Vérifier le dernier statut
      const dernierStatut = entretien.statusEntretiens
        .sort((a, b) => new Date(b.date_changement) - new Date(a.date_changement))[0];

      // Vérifier le meilleur score
      const meilleurScore = entretien.scores
        .sort((a, b) => new Date(b.date_score) - new Date(a.date_score))[0];

      // Conditions d'éligibilité
      const statutTermine = dernierStatut && dernierStatut.TypeStatusEntretien.valeur === 'Termine';
      const scoreValide = meilleurScore && meilleurScore.score >= 10;

      // Vérifier si pas encore suggéré au RH
      const dejaSuggere = await RhSuggestionsModel.findOne({
        where: {
          id_candidat: entretien.id_candidat,
          id_unite_entretien: entretien.id_unite_entretien
        }
      });

      if (statutTermine && scoreValide && !dejaSuggere) {
        // Construire l'objet candidat avec toutes les informations
        const candidatInfo = {
          id_unite_entretien: entretien.id_unite_entretien,
          id_candidat: entretien.id_candidat,
          id_unite: entretien.id_unite,
          date_entretien: entretien.date_entretien,
          duree: entretien.duree,
          score: meilleurScore.score,
          
          // Informations candidat
          id_tiers: entretien.candidat.id_tiers,
          nom: entretien.candidat.Tier.nom,
          prenom: entretien.candidat.Tier.prenom,
          email: entretien.candidat.Tier.email,
          contact: entretien.candidat.Tier.contact,
          cv: entretien.candidat.cv,
          
          // Informations supplémentaires
          age: new Date().getFullYear() - new Date(entretien.candidat.Tier.date_naissance).getFullYear(),
          ville: entretien.candidat.Tier.Ville?.valeur,
          genre: entretien.candidat.Tier.Genre?.valeur,
          situation_matrimoniale: entretien.candidat.Tier.SituationMatrimoniale?.valeur,
          
          // Poste et unité
          poste_nom: entretien.candidat.Annonce.Poste.valeur,
          unite_nom: entretien.candidat.Annonce.Poste.Unite?.nom,
          
          // Langues et qualités
          langues: entretien.candidat.Tier.langueTiers?.map(lt => lt.Langue.valeur).join(', ') || '',
          qualites: entretien.candidat.Tier.qualiteTiers?.map(qt => qt.Qualite.valeur).join(', ') || ''
        };

        candidatsEligibles.push(candidatInfo);
      }
    }

    return candidatsEligibles;
  } catch (err) {
    console.error('Erreur getCandidatsEligiblesPourRh:', err);
    throw err;
  }
};

/**
 * Suggérer un candidat au RH
 */
const suggestToRh = async ({ id_unite_entretien, id_candidat }) => {
  try {
    if (!id_unite_entretien || !id_candidat) {
      throw new Error('id_unite_entretien et id_candidat sont requis');
    }

    // Vérifier qu'il n'y a pas déjà une suggestion
    const existingSuggestion = await RhSuggestionsModel.findOne({
      where: {
        id_candidat,
        id_unite_entretien
      }
    });

    if (existingSuggestion) {
      throw new Error('Ce candidat a déjà été suggéré au RH');
    }

    const suggestion = await RhSuggestionsModel.create({
      id_unite_entretien,
      id_candidat,
      date_suggestion: new Date()
    });

    return suggestion;
  } catch (err) {
    console.error('Erreur suggestToRh:', err);
    throw err;
  }
};

/**
 * Obtenir toutes les suggestions faites au RH par cette unité
 */
const getAllRhSuggestions = async (id_unite = null) => {
  try {
    const suggestions = await RhSuggestionsModel.findAll({
      include: [
        {
          model: UniteEntretiens,
          as: 'entretien',
          where: id_unite ? { id_unite } : {},
          include: [
            { model: Unites, as: 'unite', attributes: ['nom'] }
          ]
        },
        {
          model: Candidats,
          as: 'candidat',
          include: [
            {
              model: Tiers,
              as: 'Tier',
              include: [
                { model: Villes, as: 'Ville', attributes: ['valeur'] },
                { model: Genres, as: 'Genre', attributes: ['valeur'] }
              ]
            },
            {
              model: Annonces,
              as: 'Annonce',
              include: [
                { model: Postes, as: 'Poste', attributes: ['valeur'] }
              ]
            }
          ]
        }
      ],
      order: [['date_suggestion', 'DESC']]
    });

    return suggestions;
  } catch (err) {
    console.error('Erreur getAllRhSuggestions:', err);
    throw err;
  }
};

/**
 * Obtenir les jours fériés
 */
const getJoursFeries = async () => {
  try {
    return await JoursFeries.findAll({ order: [['date_ferie', 'ASC']] });
  } catch (err) {
    console.error('Erreur getJoursFeries:', err);
    throw err;
  }
};

/**
 * Obtenir les horaires ouvrés
 */
const getHorairesOuvres = async () => {
  try {
    return await HorairesOuvres.findAll({ order: [['heure_debut', 'ASC']] });
  } catch (err) {
    console.error('Erreur getHorairesOuvres:', err);
    throw err;
  }
};

module.exports = {
  getEntretiensParMois,
  getEntretiensParJour,
  createUniteEntretien,
  updateStatusUniteEntretien,
  createScoreUniteEntretien,
  getDisponibilitesUnite,
  getProchaineDisponibilite,
  getCandidatsEligiblesPourRh,
  suggestToRh,
  getAllRhSuggestions,
  getJoursFeries,
  getHorairesOuvres
};