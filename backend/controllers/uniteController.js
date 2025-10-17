// ===== SERVICES IMPORTS =====
// Services de traitement métier
const traitementAnnonceService = require('../services/unite/traitementAnnoncesService');
const traitementDossierService = require('../services/unite/traitementDossierService');
const candidatsService = require('../services/unite/candidatsService');
const entretiensService = require('../services/unite/entretiensService');
const emailService = require('../services/unite/emailService');
const suggestionsService = require('../services/unite/suggestionsService');
const qcmCandidatsService = require('../services/unite/qcmCandidatsService');

// Services de base de données
const unitesService = require('../services/unite/unitesService');
const postesService = require('../services/unite/postesService');
const genresService = require('../services/unite/genresService');
const villesService = require('../services/unite/villesService');
const niveauxService = require('../services/unite/niveauxService');
const filieresService = require('../services/unite/filieresService');
const domainesService = require('../services/unite/domainesService');
const languesService = require('../services/unite/languesService');
const qualitesService = require('../services/unite/qualitesService');
const situationsMatrimonialesService = require('../services/unite/situationMatrimonialesService');

// Services de relations
const niveauFiliereService = require('../services/unite/niveauFiliereAnnoncesService');
const experienceAnnoncesService = require('../services/unite/experienceAnnoncesService');
const langueAnnoncesService = require('../services/unite/langueAnnoncesService');
const qualiteAnnoncesService = require('../services/unite/qualiteAnnoncesService');

// Services d'annonces
const annoncesService = require('../services/unite/AnnoncesService');
const annoncesCompletService = require('../services/unite/annoncesCompletService');
const statusAnnonceService = require('../services/unite/statusAnnoncesService');

// Services QCM
const qcmAnnoncesService = require('../services/unite/qcmAnnoncesService');
const questionQcmsService = require('../services/unite/questionQcmsService');
const reponseQcmsService = require('../services/unite/reponseQcmsService');

// Services de vues
const vueAnnoncesService = require('../services/unite/vueAnnoncesService');
const vueStatusAnnoncesService = require('../services/unite/vueStatusAnnoncesService');
const vueQuestionReponsesService = require('../services/unite/vueQuestionReponsesService');

// Services externes
const nodemailer = require('nodemailer');
const uniteEntretiensService = require('../services/uniteEntretiensService');

// Service principal pour les nouvelles fonctionnalités
const uniteMainService = require('../services/unitesService');


// ===== CONTROLLERS =====

exports.getAllAnnoncesUnite = async (req, res) => {
  try {
    // Supporter plusieurs sources pour id_unite (auth, query id_unite, ou fallback query id)
    const id_unite = req.user?.id_unite || req.query.id_unite || req.query.id;

    if (!id_unite) {
      return res.status(400).json({
        message: "Paramètre 'id_unite' manquant",
        data: null,
        success: false
      });
    }

    const data = await traitementAnnonceService.getAllAnnonces(id_unite);
    res.json({ 
      message: 'Liste des annonces récupérée avec succès',
      data: data,
      success: true
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des annonces',
      data: null,
      success: false
    });
  }
};

exports.getAnnonceByIdUnite = async (req, res) => {
  try {
    const id = req.query.id; // ID depuis l'URL
    
    // Vérifier que l'ID est fourni
    if (!id) {
      return res.status(400).json({
        message: 'L\'ID de l\'annonce est requis',
        data: null,
        success: false
      });
    }
    
    const data = await traitementAnnonceService.getAnnonceById(id);
    if (!data) {
      return res.status(404).json({
        message: 'Annonce non trouvée',
        data: null,
        success: false
      });
    }
    res.json({
      message: 'Annonce récupérée avec succès',
      data,
      success: true
    });
  } catch (err) {
    console.error('Erreur dans getAnnonceByIdUnite:', err);
    res.status(500).json({
      message: 'Erreur lors de la récupération de l\'annonce',
      data: null,
      success: false
    });
  }
};

exports.getCandidatByIdUnite = async (req, res) => {
  try {
    const id = req.query.id; 
    const data = await traitementAnnonceService.getCandidatById(id);
    if (!data) {
      return res.status(404).json({
        message: 'Candidat non trouvé',
        data: null,
        success: false
      });
    }
    res.json({
      message: 'Candidat récupéré avec succès',
      data,
      success: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Erreur lors de la récupération du candidat',
      data: null,
      success: false
    });
  }
};

exports.sendQcmCandidat = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await traitementDossierService.sendQcmCandidat(id);
    res.status(201).json({
      message: 'QCM candidat envoyé avec succès',
      data,
      success: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Erreur lors de l\'envoi du QCM au candidat',
      data: null,
      success: false
    });
  }
};

exports.sendUniteEntretien = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await traitementDossierService.sendUniteEntretien(id);
    res.status(201).json({
      message: 'Unité d\'entretien envoyée avec succès',
      data,
      success: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Erreur lors de l\'envoi de l\'entretien unité',
      data: null,
      success: false
    });
  }
};

exports.getDetailsQR = async (req, res) =>{
   try {
    const { id } = req.params;
    const annonces = await vueQuestionReponsesService.getDetailQcmByAnnonceId(id);
    res.json({ message: 'recuperation des annonces avec succès', data: annonces, success: true });
  } catch (err) {
    console.error("Erreur dans status:", err);
    res.status(500).json({ message: 'Erreur lors de la recuperation du annonces', data: null, success: false });
  } 
}
exports.getDetailsHistorique = async (req, res) => {
   try {
    const { id } = req.params;
    const annonces = await vueStatusAnnoncesService.getStatusAnnoncesByAnnonceId(id);
    res.json({ message: 'recuperation des annonces avec succès', data: annonces, success: true });
  } catch (err) {
    console.error("Erreur dans status:", err);
    res.status(500).json({ message: 'Erreur lors de la recuperation du annonces', data: null, success: false });
  } 
}

exports.getDetailsAnnonceById = async (req, res) => {
    try {
    const { id } = req.params;
    const data = await vueAnnoncesService.getAnnonceById(id);
    res.json({ message: 'Liste des unités récupérée avec succès', data, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des unités', data: null, success: false });
  }
}

exports.getAllUnites = async (req, res) => {
  try {
    const data = await unitesService.getAllUnites();
    res.json({ message: 'Liste des unités récupérée avec succès', data, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des unités', data: null, success: false });
  }
};

exports.loginUnite = async (req, res) => {
  try {
    const { username, password } = req.body;

    const unite = await unitesService.getUniteByCredentials(username, password);

    if (unite) {
      res.json({
        message: 'Connexion réussie',
        data: { token: 'fake-jwt-token', unite },
        success: true
      });
    } else {
      res.status(401).json({
        message: 'Nom ou mot de passe incorrect',
        data: null,
        success: false
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Erreur serveur lors de la connexion',
      data: null,
      success: false
    });
  }
};

exports.getUniteById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await unitesService.getUniteById(id);
    res.json({ message: 'Unité récupérée avec succès', data, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l’unité', data: null, success: false });
  }
};

exports.getPostesByIdUnite = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await postesService.getPostesByIdUnite(id);
    res.json({ message: 'Poste récupérée avec succès', data, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l’unité', data: null, success: false });
  }
};

exports.getAllParametres = async (req, res) => {
  try {
    const postes = await postesService.getAllPostes();
    const genres = await genresService.getAllGenres();
    const villes = await villesService.getAllVilles();
    const niveaux = await niveauxService.getAllNiveaux();
    const filieres = await filieresService.getAllFilieres();
    const domaines = await domainesService.getAllDomaines();
    const langues = await languesService.getAllLangues();
    const qualites = await qualitesService.getAllQualites();
    const unites = await unitesService.getAllUnites();
    // const questions = await questionQcmsService.getAllQuestionQcms();
    // const reponses = await reponseQcmsService.getAllReponseQcms();
    // const situations_matrimoniales = await situationMatrimonialesService.getAllSituationMatrimoniales();
    const data = {
      postes,
      genres,
      villes,
      niveaux,
      filieres,
      domaines,
      langues,
      qualites,
      // situations_matrimoniales,
      unites
    };
    res.json({ message: 'Liste des paramètres récupérée avec succès', data, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des paramètres', data: null, success: false });
  }
};

exports.getLanguesByAnnonce = async (req, res) => {
  try {
    const { id } = req.params;
    const langues = await langueAnnoncesService.getLangueAnnoncesByIdAnnonce(id);
    res.json({ message: 'Liste des paramètres récupérée avec succès', langues, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des paramètres', data: null, success: false });
  }
};

exports.getLangueById = async (req, res) => {
  try {
    const { id } = req.params;
    const langues = await languesService.getLangueById(id);
    res.json({ message: 'Liste des paramètres récupérée avec succès', langues, success: true });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des paramètres', data: null, success: false });
  }
};

exports.getQuestionsReponses = async (req, res) => {
  try {
    const questions = await questionQcmsService.getAllQuestionQcms();
    const reponses = await reponseQcmsService.getAllReponseQcms();
    
    // Sérialisation des objets Sequelize en JSON pur
    const data = {
      questions: questions.map(q => q.toJSON ? q.toJSON() : q),
      reponses: reponses.map(r => r.toJSON ? r.toJSON() : r)
    };
    
    console.log("Data dans controller", data);
    res.json({ message: 'Liste des questions récupérée avec succès', data, success: true });
  } catch (err) {
    console.error("Erreur dans getQuestionsReponses:", err);
    res.status(500).json({ message: 'Erreur lors de la récupération des questions', data: null, success: false });
  }
};

exports.createPoste = async (req, res) => {
  try {
    console.log("Body reçu:", req.body);
    const poste = await postesService.createPoste(req.body);
    res.json({ message: 'Poste créé avec succès', data: poste, success: true });
  } catch (err) {
    console.error("Erreur dans createPoste:", err);
    res.status(500).json({ message: 'Erreur lors de la création du poste', data: null, success: false });
  }
};

exports.updatePoste = async (req, res) => {
  try {
    console.log("Body reçu pour mise à jour:", req.body);
    const poste = await postesService.updatePoste(req.body);
    res.json({ message: 'Poste mis à jour avec succès', data: poste, success: true });
  } catch (err) {
    console.error("Erreur dans updatePoste:", err);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du poste', data: null, success: false });
  }
};

exports.createGenre = async (req, res) => {
  try {
    console.log("Body reçu:", req.body);
    const genre = await genresService.createGenre(req.body);
    res.json({ message: 'Genre créé avec succès', data: genre, success: true });
  } catch (err) {
    console.error("Erreur dans createGenre:", err);
    res.status(500).json({ message: 'Erreur lors de la création du genre', data: null, success: false });
  }
};

exports.createVille = async (req, res) => {
  try {
    console.log("Body reçu:", req.body);
    const ville = await villesService.createVille(req.body);
    res.json({ message: 'Ville créée avec succès', data: ville, success: true });
  } catch (err) {
    console.error("Erreur dans createVille:", err);
    res.status(500).json({ message: 'Erreur lors de la création de la ville', data: null, success: false });
  }
};

exports.createNiveau = async (req, res) => {
  try {
    console.log("Body reçu:", req.body);
    const niveau = await niveauxService.createNiveau(req.body);
    res.json({ message: 'Niveau créé avec succès', data: niveau, success: true });
  } catch (err) {
    console.error("Erreur dans createNiveau:", err);
    res.status(500).json({ message: 'Erreur lors de la création du niveau', data: null, success: false });
  }
};

exports.createFiliere = async (req, res) => {
  try {
    console.log("Body reçu:", req.body);
    const filiere = await filieresService.createFiliere(req.body);
    res.json({ message: 'Filière créée avec succès', data: filiere, success: true });
  }
  catch (err) {
    console.error("Erreur dans createFiliere:", err);
    res.status(500).json({ message: 'Erreur lors de la création de la filière', data: null, success: false });
  }
};

exports.createDomaine = async (req, res) => {
  try {
    console.log("Body reçu:", req.body);
    const domaine = await domainesService.createDomaine(req.body);
    res.json({ message: 'Domaine créé avec succès', data: domaine, success: true });
  } catch (err) {
    console.error("Erreur dans createDomaine:", err);
    res.status(500).json({ message: 'Erreur lors de la création du domaine', data: null, success: false });
  }
};

exports.createLangue = async (req, res) => {
  try {
    console.log("Body reçu:", req.body);
    const langue = await languesService.createLangue(req.body);
    res.json({ message: 'Langue créée avec succès', data: langue, success: true });
  } catch (err) {
    console.error("Erreur dans createLangue:", err);
    res.status(500).json({ message: 'Erreur lors de la création de la langue', data: null, success: false });
  }
};

exports.createQualite = async (req, res) => {
  try {
    console.log("Body reçu:", req.body);
    const qualite = await qualitesService.createQualite(req.body);
    res.json({ message: 'Qualité créée avec succès', data: qualite, success: true });
  } catch (err) {
    console.error("Erreur dans createQualite:", err);
    res.status(500).json({ message: 'Erreur lors de la création de la qualité', data: null, success: false });
  }
};

exports.createSituationMatrimoniale = async (req, res) => {
  try {
    console.log("Body reçu:", req.body);
    const situationMatrimoniale = await situationsMatrimonialesService.createSituationMatrimoniale(req.body);
    res.json({ message: 'Situation matrimoniale créée avec succès', data: situationMatrimoniale, success: true });
  } catch (err) {
    console.error("Erreur dans createSituationMatrimoniale:", err);
    res.status(500).json({ message: 'Erreur lors de la création de la situation matrimoniale', data: null, success: false });
  }
};

exports.createAnnonce = async (req, res) => {
  try {
    console.log("Body recu:", req.body);
    
    // Récupérer l'ID de l'unité depuis le body ou depuis l'authentification
    // Si id_unite n'est pas dans le body, essayer de le récupérer depuis req.user ou req.query
    const id_unite = req.body.id_unite || req.user?.id_unite || req.query.id_unite;
    
    if (!id_unite) {
      return res.status(400).json({ 
        message: 'ID de l\'unité requis pour créer une annonce', 
        data: null, 
        success: false 
      });
    }
    
    // Ajouter id_unite aux données
    const annonceData = {
      ...req.body,
      id_unite: id_unite
    };
    
    const annonce = await annoncesService.createAnnonce(annonceData);
    res.json({ message: 'Annonce créée avec succès', data: annonce, success: true });
  } catch (err) {
    console.error("Erreur dans creation annonce:", err);
    res.status(500).json({ message: 'Erreur lors de la création de l annonce', data: null, success: false });
  }
};

exports.addNiveauFiliere = async (req, res) => {
  try {
    console.log("Body recu", req.body);
    console.log("Type de body:", Array.isArray(req.body) ? "array" : typeof req.body);
    // Vérification du modèle utilisé dans le service
    console.log("Type du service:", typeof niveauFiliereService.createNiveauFiliereAnnonce);

    const niveauFiliere = await niveauFiliereService.createNiveauFiliereAnnonce(req.body);
    console.log("Bobody", niveauFiliere);
    res.json({ message: 'Niveau Filiere créée avec succès', data: niveauFiliere, success: true });
  } catch (err) {
    console.error("Erreur lors de l'insertion du niveau_filiere:", err);
    if (err && err.message) {
      res.status(500).json({ message: err.message, data: null, success: false });
    } else {
      res.status(500).json({ message: 'Erreur lors de la création du niveau filiere', data: null, success: false });
    }
  }
};

exports.addExperienceAnnonce = async (req, res) => {
  try {
    console.log("body recu", req.body);
    const experience = await experienceAnnoncesService.createExperienceAnnonce(req.body);
    res.json({ message: 'Experience créée avec succès', data: experience, success: true });
  } catch (err) {
    console.error("Erreur lors de l'insertion du Experience:", err);
    res.status(500).json({ message: 'Erreur lors de la création d Experience', data: null, success: false });
  }
}

exports.addLanguesAnnonce = async (req, res) => {
  try {
    console.log("body recu", req.body);
    const langue = await langueAnnoncesService.createLangueAnnonce(req.body);
    res.json({ message: 'Langue créée avec succès', data: langue, success: true });
  } catch (err) {
    console.error("Erreur lors de l'insertion du Langue:", err);
    res.status(500).json({ message: 'Erreur lors de la création d Langue', data: null, success: false });
  }
};

exports.addQualitesAnnonce = async (req, res) => {
  try {
    console.log("body recu", req.body);
    const qualite = await qualiteAnnoncesService.createQualiteAnnonce(req.body);
    res.json({ message: 'Qualité créée avec succès', data: qualite, success: true });
  } catch (err) {
    console.error("Erreur lors de l'insertion du Qualite:", err);
    res.status(500).json({ message: 'Erreur lors de la création d Qualite', data: null, success: false });
  }
};

exports.createQuestionQcm = async (req, res) => {
  try {
    console.log("Body reçu:", req.body);
    const questions = await questionQcmsService.createQuestionQcm(req.body);
    res.json({ message: 'Questions créées avec succès', data: questions, success: true });
  } catch (err) {
    console.error("Erreur dans createQuestions:", err);
    res.status(500).json({ message: 'Erreur lors de la création des questions', data: null, success: false });
  }
};

exports.createReponseQcm = async (req, res) => {
  try {
    console.log("Body reçu:", req.body);
    const reponses = await reponseQcmsService.createReponseQcm(req.body);
    res.json({ message: 'Réponses créées avec succès', data: reponses, success: true });
  } catch (err) {
    console.error("Erreur dans createReponses:", err);
    res.status(500).json({ message: 'Erreur lors de la création des réponses', data: null, success: false });
  }
};

exports.getQCMAnnonce = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID reçu:", id);
    const qcm = await qcmAnnoncesService.getQcmAnnonceByAnnonceId(id);
    res.json({ message: 'QCM récupéré avec succès', data: qcm, success: true });
  } catch (err) {
    console.error("Erreur dans getQCMAnnonce:", err);
    res.status(500).json({ message: 'Erreur lors de la récupération du QCM', data: null, success: false });
  }
};

exports.createQcm = async (req, res) => {
  try {
    console.log("Body reçu:", req.body);
    const qcm = await qcmAnnoncesService.createQcmAnnonce(req.body);
    res.json({ message: 'QCM créé avec succès', data: qcm, success: true });
  } catch (err) {
    console.error("Erreur dans createQcm:", err);
    res.status(500).json({ message: 'Erreur lors de la création du QCM', data: null, success: false });
  }
};

exports.statusAnnonce = async (req, res) => {
  try {
    console.log("Body reçu:", req.body);
    const status = await statusAnnonceService.createStatusAnnonce(req.body);
    res.json({ message: 'Status ajouté avec succès', data: status, success: true });
  } catch (err) {
    console.error("Erreur dans status:", err);
    res.status(500).json({ message: 'Erreur lors de la création du status', data: null, success: false });
  }
}

exports.getAllAnnonces = async (req, res) => {
  try {
    const annonces = await annoncesCompletService.getAll();
    res.json({ message: 'recuperation des annonces avec succès', data: annonces, success: true });
  } catch (err) {
    console.error("Erreur dans status:", err);
    res.status(500).json({ message: 'Erreur lors de la recuperation du annonces', data: null, success: false });
  }
}

exports.getAnnonceById = async (req, res) => {
  try {
    const { id } = req.params;
    const annonces = await annoncesCompletService.getById(id);
    res.json({ message: 'recuperation des annonces avec succès', data: annonces, success: true });
  } catch (err) {
    console.error("Erreur dans status:", err);
    res.status(500).json({ message: 'Erreur lors de la recuperation du annonces', data: null, success: false });
  }
}

exports.updateDateUniteEntretien = async (req, res) => {
  try {
    const { id, nouvelle_date } = req.body;
    const entretien = await entretiensService.updateDateUniteEntretien(id, nouvelle_date);
    res.json({ message: 'Date d\'entretien mise à jour avec succès', data: entretien, success: true });
  } catch (err) {
    console.error("Erreur dans updateDateUniteEntretien:", err);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la date', data: null, success: false });
  }
};

exports.updateStatusUniteEntretien = async (req, res) => {
  try {
    const { id_entretien, id_status } = req.body;
    const status = await entretiensService.updateStatusUniteEntretien(id_entretien, id_status);
    res.json({ message: 'Statut d\'entretien mis à jour avec succès', data: status, success: true });
  } catch (err) {
    console.error("Erreur dans updateStatusUniteEntretien:", err);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du statut', data: null, success: false });
  }
};

exports.createScoreUniteEntretien = async (req, res) => {
  try {
    const scoreData = req.body;
    const score = await entretiensService.createScoreUniteEntretien(scoreData);
    res.json({ message: 'Score d\'entretien créé avec succès', data: score, success: true });
  } catch (err) {
    console.error("Erreur dans createScoreUniteEntretien:", err);
    res.status(500).json({ message: 'Erreur lors de la création du score', data: null, success: false });
  }
};

exports.createQcmCandidat = async (req, res) => {
  try {
    const qcmData = req.body;
    const qcm = await qcmCandidatsService.createQcmCandidat(qcmData);
    res.json({ message: 'QCM candidat créé avec succès', data: qcm, success: true });
  } catch (err) {
    console.error("Erreur dans createQcmCandidat:", err);
    res.status(500).json({ message: 'Erreur lors de la création du QCM candidat', data: null, success: false });
  }
};

exports.createUniteEntretien = async (req, res) => {
  try {
    const entretienData = req.body;
    const entretien = await entretiensService.createUniteEntretien(entretienData);
    res.json({ message: 'Entretien unité créé avec succès', data: entretien, success: true });
  } catch (err) {
    console.error("Erreur dans createUniteEntretien:", err);
    res.status(500).json({ message: 'Erreur lors de la création de l\'entretien unité', data: null, success: false });
  }
};


exports.getAllRhSuggestions = async (req, res) => {
  try {
    const suggestions = await suggestionsService.getAllRhSuggestions();
    res.json({ message: 'Liste des suggestions récupérée avec succès', data: suggestions, success: true });
  } catch (err) {
    console.error("Erreur dans getAllRhSuggestions:", err);
    res.status(500).json({ message: 'Erreur lors de la récupération des suggestions', data: null, success: false });
  }
};

exports.getAllUniteEntretiensParJour = async (req, res) => {
  try {
    const { day } = req.query; // format 'YYYY-MM-DD'
    if (!day) {
      return res.status(400).json({ message: 'Jour manquant', data: null, success: false });
    }

    const id_unite = req.user?.id_unite || req.query.id_unite;
    const entretiens = await uniteMainService.getEntretiensParJour(day, id_unite);
    res.json({ message: 'Entretiens récupérés', data: entretiens, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', data: null, success: false });
  }
};

exports.suggestToRh = async (req, res) => {
  try {
    const { id_unite_entretien, id_candidat } = req.body;

    if (!id_unite_entretien || !id_candidat) {
      return res.status(400).json({ message: 'id_unite_entretien et id_candidat sont requis', data: null, success: false });
    }

    const suggestion = await uniteEntretiensService.suggestToRh({ id_unite_entretien, id_candidat });

    res.status(201).json({
      message: 'Suggestion envoyée au RH avec succès',
      data: suggestion,
      success: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message, data: null, success: false });
  }
}


// exports.getAllRhSuggestions = async (req, res) => {
//   try {
//     const suggestions = await uniteEntretiensService.getAllRhSuggestions();

//     res.json({
//       message: 'Liste des suggestions Rh récupérée avec succès',
//       data: suggestions,
//       success: true
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: 'Erreur lors de la récupération des suggestions',
//       data: null,
//       success: false
//     });
//   }
// };

// ===== NOUVELLES MÉTHODES POUR ENTRETIENS UNITÉ =====

// Récupérer les entretiens par mois pour le calendrier
exports.getEntretiensParMois = async (req, res) => {
  try {
    const { start, end } = req.query;
    const id_unite = req.user?.id_unite || req.query.id_unite;
    
    const entretiens = await uniteMainService.getEntretiensParMois(start, end, id_unite);
    res.json({
      message: 'Entretiens récupérés avec succès',
      data: entretiens,
      success: true
    });
  } catch (err) {
    console.error("Erreur dans getEntretiensParMois:", err);
    res.status(500).json({
      message: 'Erreur lors de la récupération des entretiens',
      data: null,
      success: false
    });
  }
};

// Récupérer les candidats éligibles pour suggestion RH
exports.getCandidatsEligiblesPourRh = async (req, res) => {
  try {
    const id_unite = req.user?.id_unite || req.query.id_unite;
    const candidats = await uniteMainService.getCandidatsEligiblesPourRh(id_unite);
    res.json({
      message: 'Candidats éligibles récupérés avec succès',
      data: candidats,
      success: true
    });
  } catch (err) {
    console.error("Erreur dans getCandidatsEligiblesPourRh:", err);
    res.status(500).json({
      message: 'Erreur lors de la récupération des candidats éligibles',
      data: null,
      success: false
    });
  }
};

// Mettre à jour le statut d'un entretien unité
exports.updateStatusUniteEntretien = async (req, res) => {
  try {
    const { id_unite_entretien } = req.params;
    const { id_type_status_entretien } = req.body;

    const status = await uniteMainService.updateStatusUniteEntretien(id_unite_entretien, id_type_status_entretien);
    
    if (!status) {
      return res.status(404).json({
        message: 'Entretien non trouvé',
        success: false
      });
    }

    res.json({
      message: 'Statut mis à jour avec succès',
      data: status,
      success: true
    });
  } catch (err) {
    console.error("Erreur updateStatusUniteEntretien:", err);
    res.status(500).json({
      message: 'Erreur lors de la mise à jour du statut',
      data: null,
      success: false
    });
  }
};

// Créer un score pour un entretien unité
exports.createScoreUniteEntretien = async (req, res) => {
  try {
    const { id_unite_entretien } = req.params;
    const { score } = req.body;

    const scoreData = await uniteMainService.createScoreUniteEntretien({
      id_unite_entretien,
      score,
      date_score: new Date()
    });

    res.json({
      message: 'Score créé avec succès',
      data: scoreData,
      success: true
    });
  } catch (err) {
    console.error("Erreur createScoreUniteEntretien:", err);
    res.status(500).json({
      message: 'Erreur lors de la création du score',
      data: null,
      success: false
    });
  }
};

// Suggérer un candidat au RH
exports.suggestToRh = async (req, res) => {
  try {
    const { id_unite_entretien, id_candidat } = req.body;

    const suggestion = await uniteMainService.suggestToRh({
      id_unite_entretien,
      id_candidat
    });

    res.json({
      message: 'Candidat suggéré au RH avec succès',
      data: suggestion,
      success: true
    });
  } catch (err) {
    console.error("Erreur suggestToRh:", err);
    res.status(500).json({
      message: err.message || 'Erreur lors de la suggestion au RH',
      data: null,
      success: false
    });
  }
};

// Obtenir toutes les suggestions faites au RH
exports.getAllRhSuggestions = async (req, res) => {
  try {
    const id_unite = req.user?.id_unite || req.query.id_unite;
    const suggestions = await uniteMainService.getAllRhSuggestions(id_unite);

    res.json({
      message: 'Suggestions RH récupérées avec succès',
      data: suggestions,
      success: true
    });
  } catch (err) {
    console.error("Erreur getAllRhSuggestions:", err);
    res.status(500).json({
      message: 'Erreur lors de la récupération des suggestions',
      data: null,
      success: false
    });
  }
};