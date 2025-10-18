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

const { evaluerCandidatCV } = require('../evaluationCandidatService');


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
          as: 'Tier',
          attributes: [
            'id_tiers', 'nom', 'prenom', 'date_naissance', 'contact', 
            'email', 'cin', 'photo', 'id_genre', 'id_situation_matrimoniale', 
            'nombre_enfants', 'id_ville'
          ],
          include: [
            { model: Genre, as: 'Genre', attributes: ['valeur'] },
            { model: Ville, as: 'Ville', attributes: ['valeur'] }
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
          include: [{ model: Langue, as: 'Langue', attributes: ['valeur'] }]
        });

        const qualitesTiers = await QualiteTiers.findAll({
          where: { id_tiers: tiersId },
          include: [{ model: Qualite, as: 'Qualite', attributes: ['valeur'] }]
        });

        const experiencesTiers = await ExperienceTiers.findAll({
          where: { id_tiers: tiersId },
          include: [{ model: Domaine, as: 'Domaine', attributes: ['valeur'] }]
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

        // -------------------------
        // ÉVALUATION CV - MATCH
        // -------------------------
        let evaluation = { pourcentage: 0, score: 0, criteres_total: 0 };
        try {
          const candidatData = {
            id_tiers: tiersId,
            date_naissance: c.Tier?.date_naissance,
            id_genre: c.Tier?.id_genre,
            id_ville: c.Tier?.id_ville,
            genre_valeur: c.Tier?.Genre?.valeur,
            ville_valeur: c.Tier?.Ville?.valeur,
            formations: niveauxFiliereTiers.map(nf => ({
              id_filiere: nf.Filiere?.id_filiere,
              filiere: nf.Filiere?.valeur,
              id_niveau: nf.Niveau?.id_niveau,
              niveau: nf.Niveau?.valeur
            })),
            langues: languesTiers.map(lt => ({
              id_langue: lt.Langue?.id_langue,
              langue: lt.Langue?.valeur
            })),
            qualites: qualitesTiers.map(qt => ({
              id_qualite: qt.Qualite?.id_qualite,
              qualite: qt.Qualite?.valeur
            })),
            experiences: experiencesTiers.map(et => ({
              id_domaine: et.Domaine?.id_domaine,
              domaine: et.Domaine?.valeur,
              duree: et.nombre_annee
            }))
          };
          evaluation = await evaluerCandidatCV(candidatData, id);
        } catch (err) {
          console.error(`Erreur lors de l'évaluation du candidat ${candidatId}:`, err.message);
        }

        // -------------------------
        // CALCUL SCORE QCM
        // -------------------------
        let scoreQcm = null;
        if (envois.length > 0) {
          // Prendre le dernier envoi QCM
          const dernierEnvoi = envois[envois.length - 1];
          if (dernierEnvoi.note !== null && dernierEnvoi.note !== undefined) {
            scoreQcm = dernierEnvoi.note;
          }
        }

        // -------------------------
        // CALCUL SCORE ENTRETIEN UNITE
        // -------------------------
        let scoreEntretien = null;
        if (uniteAvecScores.length > 0) {
          // Prendre le dernier entretien
          const dernierEntretien = uniteAvecScores[uniteAvecScores.length - 1];
          if (dernierEntretien.scores && dernierEntretien.scores.length > 0) {
            // Calculer la moyenne des scores
            const totalScore = dernierEntretien.scores.reduce((sum, s) => sum + (s.note || 0), 0);
            scoreEntretien = Math.round((totalScore / dernierEntretien.scores.length) * 100) / 100;
          }
        }

        return {
          candidat: c,
          langues: languesTiers,
          qualites: qualitesTiers,
          experiences: experiencesTiers,
          niveauxFiliere: niveauxFiliereTiers,
          envoisQcm: envois.length > 0 ? envois : [],
          reponsesQcm: reponses.length > 0 ? reponses : [],
          unite_entretiens: uniteAvecScores.length > 0 ? uniteAvecScores : [],
          pourcentage: evaluation.pourcentage,
          score_qcm: scoreQcm,
          score_entretien: scoreEntretien
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
          as: 'Tier',
          attributes: [
            'id_tiers', 'nom', 'prenom', 'date_naissance', 'contact',
            'email', 'cin', 'photo', 'id_genre', 'id_situation_matrimoniale',
            'nombre_enfants', 'id_ville'
          ],
          include: [
            { model: Genre, as: 'Genre', attributes: ['valeur'] },
            { model: Ville, as: 'Ville', attributes: ['valeur'] }
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
      include: [{ model: Langue, as: 'Langue', attributes: ['valeur'] }]
    });

    const qualites = await QualiteTiers.findAll({
      where: { id_tiers: tiersId },
      include: [{ model: Qualite, as: 'Qualite', attributes: ['valeur'] }]
    });

    const experiences = await ExperienceTiers.findAll({
      where: { id_tiers: tiersId },
      include: [{ model: Domaine, as: 'Domaine', attributes: ['valeur'] }]
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
            { model: Poste, as: 'Poste', attributes: ['valeur'] },
            { model: Ville, as: 'Ville', attributes: ['valeur'] },
            { model: Genre, as: 'Genre', attributes: ['valeur'] }
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

    // 6️⃣ ÉVALUATION CV - MATCH DÉTAILLÉ
    let evaluation = { pourcentage: 0, score: 0, criteres_total: 0, details: null };
    try {
      const id_annonce = candidatRecord.id_annonce;
      const candidatData = {
        id_tiers: tiersId,
        date_naissance: candidatRecord.Tier?.date_naissance,
        id_genre: candidatRecord.Tier?.id_genre,
        id_ville: candidatRecord.Tier?.id_ville,
        genre_valeur: candidatRecord.Tier?.Genre?.valeur,
        ville_valeur: candidatRecord.Tier?.Ville?.valeur,
        formations: niveauxFiliere.map(nf => ({
          id_filiere: nf.Filiere?.id_filiere,
          filiere: nf.Filiere?.valeur,
          id_niveau: nf.Niveau?.id_niveau,
          niveau: nf.Niveau?.valeur
        })),
        langues: langues.map(lt => ({
          id_langue: lt.Langue?.id_langue,
          langue: lt.Langue?.valeur
        })),
        qualites: qualites.map(qt => ({
          id_qualite: qt.Qualite?.id_qualite,
          qualite: qt.Qualite?.valeur
        })),
        experiences: experiences.map(et => ({
          id_domaine: et.Domaine?.id_domaine,
          domaine: et.Domaine?.valeur,
          duree: et.nombre_annee
        }))
      };
      evaluation = await evaluerCandidatCV(candidatData, id_annonce);
    } catch (err) {
      console.error(`Erreur lors de l'évaluation du candidat ${id_candidat}:`, err.message);
    }

    // 7️⃣ CALCUL SCORE QCM
    let scoreQcm = null;
    if (envoisAvecReponses.length > 0) {
      // Prendre le dernier envoi QCM
      const dernierEnvoi = envoisAvecReponses[envoisAvecReponses.length - 1];
      if (dernierEnvoi.envoi && dernierEnvoi.envoi.note !== null && dernierEnvoi.envoi.note !== undefined) {
        scoreQcm = dernierEnvoi.envoi.note;
      }
    }

    // 8️⃣ CALCUL SCORE ENTRETIEN UNITE
    let scoreEntretien = null;
    if (uniteAvecDetails.length > 0) {
      // Prendre le dernier entretien
      const dernierEntretien = uniteAvecDetails[uniteAvecDetails.length - 1];
      if (dernierEntretien.score_unite_entretien && dernierEntretien.score_unite_entretien.length > 0) {
        // Calculer la moyenne des scores
        const totalScore = dernierEntretien.score_unite_entretien.reduce((sum, s) => sum + (s.note || 0), 0);
        scoreEntretien = Math.round((totalScore / dernierEntretien.score_unite_entretien.length) * 100) / 100;
      }
    }

    // 9️⃣ Résultat final
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
      pourcentage: evaluation.pourcentage,
      score_qcm: scoreQcm,
      score_entretien: scoreEntretien,
      match_details: evaluation.details
    };

  } catch (err) {
    throw new Error('Erreur lors de la récupération du candidat : ' + err.message);
  }
};
