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


// ByIdUnite
exports.getAllAnnonces = async () => {
  try {
    const annonces = await Annonce.findAll({
      include: [
        { model: Poste, attributes: ['valeur'] }, // ou 'nom_poste' selon ton schéma
        { model: Ville, attributes: ['valeur'] }, // ou 'nom_ville'
        { model: Genre, attributes: ['valeur'] }  // ou 'nom_genre'
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
        { model: Poste, attributes: ['valeur'] },
        { model: Ville, attributes: ['valeur'] },
        { model: Genre, attributes: ['valeur'] }
      ]
    });
    if (!annonce) return null;

    // 2️⃣ Détails liés à l'annonce
    const langues = await LangueAnnonce.findAll({
      where: { id_annonce: id },
      include: [{ model: Langue, attributes: ['valeur'] }]
    });

    const qualites = await QualiteAnnonce.findAll({
      where: { id_annonce: id },
      include: [{ model: Qualite, attributes: ['valeur'] }]
    });

    const experiences = await ExperienceAnnonce.findAll({
      where: { id_annonce: id },
      include: [{ model: Domaine, attributes: ['valeur'] }]
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

    // 3️⃣ Récupération des candidats postulants
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

    const candidatsDetails = await Promise.all(
    candidats.map(async (c) => {
      const tiersId = c.id_tiers;

      // Détails du tiers
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

          return {
            candidat: c,
            langues: languesTiers,
            qualites: qualitesTiers,
            experiences: experiencesTiers,
            niveauxFiliere: niveauxFiliereTiers
          };
        })
      );

    // 4️⃣ Récupération des questions QCM + réponses
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


exports.getCandidatById = async (tiersId) => {
  try {
    // 1️⃣ Infos du candidat (table Tiers)
    const candidat = await Tiers.findOne({
      where: { id_tiers: tiersId },
      attributes: [
        'id_tiers', 'nom', 'prenom', 'date_naissance', 'contact', 
        'email', 'cin', 'photo', 'id_genre', 'id_situation_matrimoniale', 
        'nombre_enfants', 'id_ville'
      ]
    });
    if (!candidat) return null;

    // 2️⃣ Vérifier si tiers est employé et récupérer statuts
    const employe = await Employe.findOne({ where: { id_tiers: tiersId } });
    let statutsEmploye = [];
    if (employe) {
      statutsEmploye = await StatusEmploye.findAll({
        where: { id_employe: employe.id_employe },
        include: [{ model: TypeStatusEmploye, attributes: ['valeur'] }]
      });
    }

    // 3️⃣ Détails liés au candidat
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

    // 4️⃣ Ses autres candidatures
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

    return {
      candidat,
      employe: employe || null,
      statutsEmploye,
      langues,
      qualites,
      experiences,
      niveauxFiliere,
      autresAnnonces
    };

  } catch (err) {
    throw new Error('Erreur lors de la récupération du candidat : ' + err.message);
  }
};
