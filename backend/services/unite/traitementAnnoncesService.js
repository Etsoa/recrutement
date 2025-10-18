const Annonce = require('../../models/annoncesModel');
const Poste = require('../../models/postesModel');
const Ville = require('../../models/villesModel');
const Genre = require('../../models/genresModel');
const Unite = require('../../models/unitesModel');

const Langue = require('../../models/languesModel');
const Qualite = require('../../models/qualitesModel');
const Domaine = require('../../models/domainesModel');
const Filiere = require('../../models/filieresModel');
const Niveau = require('../../models/niveauxModel');

const LangueAnnonce = require('../../models/langueAnnoncesModel');
const QualiteAnnonce = require('../../models/qualiteAnnoncesModel');
const ExperienceAnnonce = require('../../models/experienceAnnoncesModel');
const NiveauFiliereAnnonce = require('../../models/niveauFiliereAnnoncesModel');

const StatusAnnonce = require('../../models/statusAnnoncesModel');
const TypeStatusAnnonce = require('../../models/typeStatusAnnoncesModel');

const Candidat = require('../../models/candidatsModel');
const Tiers = require('../../models/tiersModel');

const LangueTiers = require('../../models/langueTiersModel');
const QualiteTiers = require('../../models/qualiteTiersModel');
const ExperienceTiers = require('../../models/experienceTiersModel');
const NiveauFiliereTiers = require('../../models/niveauFiliereTiersModel');

const QuestionQcm = require('../../models/questionQcmsModel');
const ReponseQcm = require('../../models/reponseQcmsModel');
const QcmAnnonce = require('../../models/qcmAnnoncesModel');

const Employe = require('../../models/employesModel');
const TypeStatusEmploye = require('../../models/typeStatusEmployesModel');
const StatusEmploye = require('../../models/statusEmployesModel');

const EnvoiQcmCandidat = require('../../models/envoiQcmCandidatsModel');
const ReponseQcmCandidat = require('../../models/reponseQcmCandidatsModel');

const UniteEntretien = require('../../models/uniteEntretiensModel');
const StatusUniteEntretien = require('../../models/statusUniteEntretiensModel');
const TypeStatusEntretien = require('../../models/typeStatusEntretiensModel');
const ScoreUniteEntretien = require('../../models/scoreUniteEntretiensModel');


// ByIdUnite
exports.getAllAnnonces = async (id) => {
  try {
    const annonces = await Annonce.findAll({
      where: { id_unite: id },
      include: [
        { model: Poste, as: 'Poste', attributes: ['valeur'] },
        { model: Ville, as: 'Ville', attributes: ['valeur'] },
        { model: Genre, as: 'Genre', attributes: ['valeur'] }
      ],
      order: [['id_annonce', 'ASC']]
    });
    return annonces;
  } catch (err) {
    throw new Error('Erreur lors de la récupération des annonces : ' + err.message);
  }
};

exports.getAnnonceById = async (id) => {
  try {
    // 1️⃣ Récupération de l'annonce principale
    const annonce = await Annonce.findOne({
      where: { id_annonce: id },
      include: [
        { model: Poste, as: 'Poste', attributes: ['valeur'] },
        { model: Ville, as: 'Ville', attributes: ['valeur'] },
        { model: Genre, as: 'Genre', attributes: ['valeur'] }
      ]
    });
    if (!annonce) return null;

    // 2️⃣ Détails liés à l'annonce
    const langues = await LangueAnnonce.findAll({
      where: { id_annonce: id },
      include: [{ model: Langue, as: 'Langue', attributes: ['valeur'] }]
    });

    const qualites = await QualiteAnnonce.findAll({
      where: { id_annonce: id },
      include: [{ model: Qualite, as: 'Qualite', attributes: ['valeur'] }]
    });

    const experiences = await ExperienceAnnonce.findAll({
      where: { id_annonce: id },
      include: [{ model: Domaine, as: 'Domaine', attributes: ['valeur'] }]
    });

    const niveauxFiliere = await NiveauFiliereAnnonce.findAll({
      where: { id_annonce: id },
      include: [
        { model: Niveau, attributes: ['valeur'] },
        { model: Filiere, attributes: ['valeur'] }
      ]
    });

    const statuts = await StatusAnnonce.findAll({
      where: { id_annonce: id },
      include: [
        { model: TypeStatusAnnonce, attributes: ['valeur'] }
      ]
    });

    // 3️⃣ Récupération des candidats postulants (infos de base tiers incluses)
    const candidats = await Candidat.findAll({
      where: { id_annonce: id },
      include: [
        {
          model: Tiers,
          attributes: [
            'id_tiers', 'nom', 'prenom', 'date_naissance', 'contact', 
            'email', 'cin', 'photo', 'id_genre', 'id_situation_matrimoniale', 
            'nombre_enfants', 'id_ville'
          ]
        }
      ]
    });

    // 3.1️⃣ Pour chaque candidat : détails tiers + envois/reponses QCM + entretiens + scores
    const candidatsDetails = await Promise.all(
      candidats.map(async (c) => {
        const tiersId = c.id_tiers; // id_tiers stocké dans la table candidats
        const candidatId = c.id_candidat;

        // Détails du tiers (langues, qualités, expériences, niveaux/filière)
        const languesTiers = await LangueTiers.findAll({
          where: { id_tiers: tiersId },
          include: [{ model: Langue, attributes: ['valeur'] }]
        });

        const qualitesTiers = await QualiteTiers.findAll({
          where: { id_tiers: tiersId },
          include: [{ model: Qualite, attributes: ['valeur'] }]
        });

        const experiencesTiers = await ExperienceTiers.findAll({
          where: { id_tiers: tiersId },
          include: [{ model: Domaine, attributes: ['valeur'] }]
        });

        const niveauxFiliereTiers = await NiveauFiliereTiers.findAll({
          where: { id_tiers: tiersId },
          include: [
            { model: Niveau, attributes: ['valeur'] },
            { model: Filiere, attributes: ['valeur'] }
          ]
        });

        // Envois QCM liés au candidat
        const envois = await EnvoiQcmCandidat.findAll({
          where: { id_candidat: candidatId }
        });

        // Pour chaque envoi, récupérer les réponses (via id_envoi_qcm_candidat)
        const reponses = await Promise.all(
          envois.map(async (e) => {
            const reps = await ReponseQcmCandidat.findAll({
              where: { id_envoi_qcm_candidat: e.id_envoi_qcm_candidat }
            });
            return {
              id_envoi_qcm_candidat: e.id_envoi_qcm_candidat,
              envoi: e,
              reponses: reps.length > 0 ? reps : []
            };
          })
        );

        // -------------------------
        // UNITE ENTRETIEN & SCORES
        // -------------------------
        // Récupérer les entretiens (unite_entretiens) pour ce candidat
        const uniteEntretiens = await UniteEntretien.findAll({
          where: { id_candidat: candidatId }
        });

        // Pour chaque entretien, récupérer les scores liés
        const uniteAvecScores = await Promise.all(
          uniteEntretiens.map(async (u) => {
            const scores = await ScoreUniteEntretien.findAll({
              where: { id_unite_entretien: u.id_unite_entretien }
            });
            return {
              unite_entretien: u,
              scores: scores.length > 0 ? scores : []
            };
          })
        );

        return {
          candidat: c,
          langues: languesTiers,
          qualites: qualitesTiers,
          experiences: experiencesTiers,
          niveauxFiliere: niveauxFiliereTiers,
          envoisQcm: envois.length > 0 ? envois : [],
          reponsesQcm: reponses.length > 0 ? reponses : [],
          unite_entretiens: uniteAvecScores.length > 0 ? uniteAvecScores : [],
          pourcentage: 0
        };
      })
    );

    // 4️⃣ Récupération des questions QCM + réponses (déjà existant)
    const qcmsAnnonce = await QcmAnnonce.findAll({ where: { id_annonce: id } });
    const questions = await Promise.all(
      qcmsAnnonce.map(async (qcm) => {
        const question = await QuestionQcm.findOne({ where: { id_question_qcm: qcm.id_question_qcm } });
        const reponses = await ReponseQcm.findAll({ where: { id_question_qcm: qcm.id_question_qcm } });
        return { question, reponses };
      })
    );

    return {
      annonce,
      langues,
      qualites,
      experiences,
      niveauxFiliere,
      statuts,
      candidatsDetails,
      qcms: questions
    };

  } catch (err) {
    throw new Error('Erreur lors de la récupération des détails : ' + err.message);
  }
};


exports.getCandidatById = async (id_candidat) => {
  try {
    // 0️⃣ Récupérer le candidat (table Candidat) avec les infos Tiers de base
    const candidatRecord = await Candidat.findOne({
      where: { id_candidat },
      include: [
        {
          model: Tiers,
          attributes: [
            'id_tiers', 'nom', 'prenom', 'date_naissance', 'contact',
            'email', 'cin', 'photo', 'id_genre', 'id_situation_matrimoniale',
            'nombre_enfants', 'id_ville'
          ]
        }
      ]
    });
    if (!candidatRecord) return null;

    const tiersId = candidatRecord.id_tiers;

    // 1️⃣ Vérifier si tiers est employé et récupérer statuts employé (si existe)
    const employe = await Employe.findOne({ where: { id_tiers: tiersId } });
    let statutsEmploye = [];
    if (employe) {
      statutsEmploye = await StatusEmploye.findAll({
        where: { id_employe: employe.id_employe },
        include: [{ model: TypeStatusEmploye, attributes: ['valeur'] }]
      });
    }

    // 2️⃣ Détails liés au candidat (langues, qualités, expériences, niveaux/filière)
    const langues = await LangueTiers.findAll({
      where: { id_tiers: tiersId },
      include: [{ model: Langue, attributes: ['valeur'] }]
    });

    const qualites = await QualiteTiers.findAll({
      where: { id_tiers: tiersId },
      include: [{ model: Qualite, attributes: ['valeur'] }]
    });

    const experiences = await ExperienceTiers.findAll({
      where: { id_tiers: tiersId },
      include: [{ model: Domaine, attributes: ['valeur'] }]
    });

    const niveauxFiliere = await NiveauFiliereTiers.findAll({
      where: { id_tiers: tiersId },
      include: [
        { model: Niveau, attributes: ['valeur'] },
        { model: Filiere, attributes: ['valeur'] }
      ]
    });

    // 3️⃣ Ses autres candidatures (autres annonces auxquelles il a postulé)
    const candidatures = await Candidat.findAll({
      where: { id_tiers: tiersId },
      attributes: ['id_candidat', 'id_annonce', 'cv']
    });

    const autresAnnonces = await Promise.all(
      candidatures.map(async (cand) => {
        const annonceInfo = await Annonce.findOne({
          where: { id_annonce: cand.id_annonce },
          include: [
            { model: Poste, attributes: ['valeur'] },
            { model: Ville, attributes: ['valeur'] },
            { model: Genre, attributes: ['valeur'] }
          ]
        });
        return {
          annonce: annonceInfo,
          candidature: cand
        };
      })
    );

    // 4️⃣ ENVOIS QCM du candidat + pour chaque envoi : ses réponses
    const envoisQcm = await EnvoiQcmCandidat.findAll({
      where: { id_candidat }
    });

    const envoisAvecReponses = await Promise.all(
      envoisQcm.map(async (envoi) => {
        const reponses = await ReponseQcmCandidat.findAll({
          where: { id_envoi_qcm_candidat: envoi.id_envoi_qcm_candidat }
        });
        return {
          envoi: envoi,
          reponses: reponses.length > 0 ? reponses : []
        };
      })
    );

    // 5️⃣ ENTRETIENS (unite_entretiens) pour ce candidat
    const uniteEntretiens = await UniteEntretien.findAll({
      where: { id_candidat }
    });

    const uniteAvecDetails = await Promise.all(
      uniteEntretiens.map(async (u) => {
        // statuses liés à cette unite_entretien (avec type)
        const statuses = await StatusUniteEntretien.findAll({
          where: { id_unite_entretien: u.id_unite_entretien },
          include: [{ model: TypeStatusEntretien, attributes: ['valeur'] }]
        });

        // scores liés à cette unite_entretien
        const scores = await ScoreUniteEntretien.findAll({
          where: { id_unite_entretien: u.id_unite_entretien }
        });

        return {
          unite_entretien: u,
          status_unite_entretien: statuses.length > 0 ? statuses : [],
          score_unite_entretien: scores.length > 0 ? scores : []
        };
      })
    );

    // 6️⃣ Résultat final
    return {
      candidat: candidatRecord,         // ligne de la table candidats (+tiers)
      employe: employe || null,
      statutsEmploye,
      langues,
      qualites,
      experiences,
      niveauxFiliere,
      autresAnnonces,
      envois_qcm: envoisAvecReponses.length > 0 ? envoisAvecReponses : [],
      unite_entretiens: uniteAvecDetails.length > 0 ? uniteAvecDetails : [],
      pourcentage: 0
    };

  } catch (err) {
    throw new Error('Erreur lors de la récupération du candidat : ' + err.message);
  }
};
