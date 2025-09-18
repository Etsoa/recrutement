// Services
const annoncesService = require('../services/annoncesService');
const tiersService = require('../services/tiersService');
const candidatsService = require('../services/candidatsService');
const envoiQcmService = require('../services/envoiQcmCandidatsService');
const questionQcmsService = require('../services/questionQcmsService');
const reponseQcmService = require('../services/reponseQcmCandidatsService');
const parametresService = require('../services/pourcentageMinimumCvService');

// Récupérer toutes les annonces actives
exports.getAllAnnonces = async (req, res) => {
  try {
    const annonces = await annoncesService.getAllAnnoncesActives();
    
    res.json({ 
      message: 'Liste des annonces récupérée avec succès', 
      data: annonces, 
      success: true 
    });
  } catch (err) {
    console.error('Erreur getAllAnnonces:', err);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des annonces', 
      data: null, 
      success: false 
    });
  }
};

// Récupérer une annonce par ID avec tous ses détails
exports.getAnnonceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const annonce = await annoncesService.getAnnonceCompleteById(id);
    
    if (!annonce) {
      return res.status(404).json({
        message: 'Annonce non trouvée',
        data: null,
        success: false
      });
    }
    
    res.json({ 
      message: 'Annonce récupérée avec succès', 
      data: annonce, 
      success: true 
    });
  } catch (err) {
    console.error('Erreur getAnnonceById:', err);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération de l\'annonce', 
      data: null, 
      success: false 
    });
  }
};

// Récupérer tous les paramètres pour les formulaires
exports.getAllParametres = async (req, res) => {
  try {
    const parametres = await parametresService.getAllParametresReference();
    
    res.json({ 
      message: 'Paramètres récupérés avec succès', 
      data: parametres, 
      success: true 
    });
  } catch (err) {
    console.error('Erreur getAllParametres:', err);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des paramètres', 
      data: null, 
      success: false 
    });
  }
};

// Créer un candidat (tiers + candidat)
exports.createCandidat = async (req, res) => {
  try {
    const {
      // Données tiers
      nom, prenom, date_naissance, id_genre, id_situation_matrimoniale,
      nombre_enfants, contact, email, cin, id_ville, photo,
      // Relations du candidat
      formations, langues, qualites, experiences,
      // Données candidat
      id_annonce, cv
    } = req.body;
    
    // Validation des champs obligatoires
    if (!nom || !prenom || !date_naissance || !id_genre || !contact || !email || !cin || !id_ville || !id_annonce || !cv) {
      return res.status(400).json({
        message: 'Tous les champs obligatoires doivent être remplis',
        data: null,
        success: false
      });
    }
    
    // Vérifier que l'annonce existe et est active
    const annonceActive = await annoncesService.checkAnnonceActive(id_annonce);
    if (!annonceActive) {
      return res.status(404).json({
        message: 'Annonce non trouvée ou inactive',
        data: null,
        success: false
      });
    }
    
    // Vérifier si le CIN existe déjà
    let tiers = await tiersService.checkCinExists(cin);
    let id_tiers;
    
    if (tiers) {
      // Le tiers existe déjà, utiliser son ID
      id_tiers = tiers.id_tiers;
    } else {
      // Créer un nouveau tiers avec ses relations
      const tiersData = {
        nom, prenom, date_naissance, id_genre, id_situation_matrimoniale,
        nombre_enfants, contact, email, cin, id_ville, photo
      };
      
      const relations = { formations, langues, qualites, experiences };
      const nouveauTiers = await tiersService.createTiersComplete(tiersData, relations);
      id_tiers = nouveauTiers.id_tiers;
    }
    
    // Vérifier si le candidat existe déjà pour cette annonce
    const candidatExistant = await candidatsService.checkCandidatExists(id_tiers, id_annonce);
    if (candidatExistant) {
      return res.status(409).json({
        message: 'Ce candidat a déjà postulé pour cette annonce',
        data: null,
        success: false
      });
    }
    
    // Créer le candidat
    const candidat = await candidatsService.createCandidat({
      id_tiers,
      id_annonce,
      cv
    });
    
    // Récupérer le pourcentage minimum CV pour l'annonce
    const pourcentage_minimum = await parametresService.getPourcentageMinimumCv();
    
    // Simuler l'évaluation du CV (à remplacer par votre logique d'IA)
    const pourcentage_cv_simule = Math.floor(Math.random() * 40) + 60; // Entre 60 et 99
    
    const qcm_automatique = pourcentage_cv_simule >= pourcentage_minimum;
    
    // Si le CV atteint le minimum, créer un envoi QCM
    let envoi_qcm = null;
    if (qcm_automatique) {
      envoi_qcm = await envoiQcmService.createEnvoiQcm(candidat.id_candidat);
    }
    
    const data = {
      id_candidat: candidat.id_candidat,
      id_tiers,
      nom,
      prenom,
      email,
      id_annonce,
      cv,
      pourcentage_cv: pourcentage_cv_simule,
      pourcentage_minimum,
      qcm_automatique,
      envoi_qcm,
      date_candidature: new Date().toISOString()
    };
    
    res.status(201).json({
      message: 'Candidature créée avec succès',
      data,
      success: true
    });
  } catch (err) {
    console.error('Erreur createCandidat:', err);
    res.status(500).json({
      message: 'Erreur lors de la création de la candidature',
      data: null,
      success: false
    });
  }
};

// Récupérer les questions QCM pour un candidat avec token
exports.qcmQuestions = async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        message: 'Token requis',
        data: null,
        success: false
      });
    }
    
    // Vérifier la validité du token
    const envoiQcm = await envoiQcmService.verifyTokenQcm(token);
    if (!envoiQcm) {
      return res.status(404).json({
        message: 'Token invalide ou expiré',
        data: null,
        success: false
      });
    }
    
    // Vérifier si le QCM n'a pas déjà été répondu
    const qcmCompleted = await envoiQcmService.checkQcmCompleted(envoiQcm.id_envoi_qcm_candidat);
    if (qcmCompleted) {
      return res.status(409).json({
        message: 'Ce QCM a déjà été complété',
        data: null,
        success: false
      });
    }
    
    // Récupérer les questions pour cette annonce
    const questions = await questionQcmsService.getQuestionsByAnnonce(envoiQcm.id_annonce);
    
    const data = {
      id_envoi_qcm_candidat: envoiQcm.id_envoi_qcm_candidat,
      candidat: {
        nom: envoiQcm.nom,
        prenom: envoiQcm.prenom,
        poste: envoiQcm.poste
      },
      questions,
      debut_qcm: new Date().toISOString()
    };
    
    res.json({
      message: 'Questions QCM envoyées avec succès',
      data,
      success: true
    });
  } catch (err) {
    console.error('Erreur qcmQuestions:', err);
    res.status(500).json({
      message: 'Erreur lors de l\'envoi des questions QCM',
      data: null,
      success: false
    });
  }
};

// Enregistrer les réponses QCM et calculer le score
exports.qcmReponses = async (req, res) => {
  try {
    const { token, reponses, debut, fin } = req.body;
    
    if (!token || !reponses || !Array.isArray(reponses)) {
      return res.status(400).json({
        message: 'Token et réponses requis',
        data: null,
        success: false
      });
    }
    
    // Vérifier le token
    const envoiQcm = await envoiQcmService.verifyTokenQcm(token);
    if (!envoiQcm) {
      return res.status(404).json({
        message: 'Token invalide',
        data: null,
        success: false
      });
    }
    
    // Calculer la durée
    const duree = Math.round((new Date(fin) - new Date(debut)) / 1000); // en secondes
    
    // Préparer les données pour l'enregistrement
    const reponsesData = [];
    
    for (const reponse of reponses) {
      const { id_question, id_reponse_selectionnee } = reponse;
      
      // Vérifier si la réponse est correcte
      const est_correcte = await questionQcmsService.verifyReponse(id_reponse_selectionnee);
      const score_question = est_correcte ? 1 : 0;
      
      // Récupérer l'id_qcm_annonce
      const id_qcm_annonce = await reponseQcmService.getQcmAnnonceByQuestion(id_question, envoiQcm.id_annonce);
      
      reponsesData.push({
        id_envoi_qcm_candidat: envoiQcm.id_envoi_qcm_candidat,
        id_qcm_annonce,
        debut,
        fin,
        duree,
        reponse: id_reponse_selectionnee.toString(),
        score: score_question
      });
    }
    
    // Enregistrer toutes les réponses
    await reponseQcmService.createMultipleReponses(reponsesData);
    
    // Calculer les statistiques finales
    const stats = await reponseQcmService.calculateQcmStats(envoiQcm.id_envoi_qcm_candidat);
    
    res.json({
      message: 'Réponses QCM enregistrées avec succès',
      data: stats,
      success: true
    });
  } catch (err) {
    console.error('Erreur qcmReponses:', err);
    res.status(500).json({
      message: 'Erreur lors de l\'enregistrement des réponses QCM',
      data: null,
      success: false
    });
  }
};
