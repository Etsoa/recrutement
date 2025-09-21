const unitesService = require('../services/unitesService');
const postesService = require('../services/postesService');
const genresService = require('../services/genresService');
const villesService = require('../services/villesService');
const niveauxService = require('../services/niveauxService');
const filieresService = require('../services/filieresService');
const domainesService = require('../services/domainesService');
const languesService = require('../services/languesService');
const qualitesService = require('../services/qualitesService');
const situationMatrimonialesService = require('../services/situationMatrimonialesService');
const niveauFiliereService = require('../services/niveauFiliereAnnoncesService');
const experienceAnnoncesService = require('../services/experienceAnnoncesService');
const annoncesService = require('../services/AnnoncesService');
const annoncesCompletService = require('../services/annoncesCompletService');
const langueAnnoncesService = require('../services/langueAnnoncesService');
const qualiteAnnoncesService = require('../services/qualiteAnnoncesService');
const qcmAnnoncesService = require('../services/qcmAnnoncesService');
const questionQcmsService = require('../services/questionQcmsService');
const reponseQcmsService = require('../services/reponseQcmsService');
const statusAnnonceService = require('../services/statusAnnoncesService');
const vueAnnoncesService = require('../services/vueAnnoncesService');
const vueStatusAnnoncesService = require('../services/vueStatusAnnoncesService');
const vueQuestionReponsesService = require('../services/vueQuestionReponsesService');

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
    const data = {
      questions,
      reponses
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
    const annonce = await annoncesService.createAnnonce(req.body);
    res.json({ message: 'Annonce créée avec succès', data: annonce, success: true });
  } catch (err) {
    console.error("Erreur dans createSituationMatrimoniale:", err);
    res.status(500).json({ message: 'Erreur lors de la création de la situation matrimoniale', data: null, success: false });
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
