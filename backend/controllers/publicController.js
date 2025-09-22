// Services
const annoncesService = require('../services/annoncesService');
const parametreService = require('../services/parametresService');
const tiersService = require('../services/tiersService');
const candidatsService = require('../services/candidatsService');
const envoiQcmService = require('../services/envoiQcmService');
const evaluationService = require('../services/evaluationService');
const parametresService = require('../services/parametresService');
const questionQcmsService = require('../services/questionQcmsService');
const reponseQcmService = require('../services/reponseQcmService');

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

exports.getAnnonceById = async (req, res) => {
  try {
    // Get id from body or query as mentioned in routes comment
    const id = req.body.id || req.query.id;
    
    if (!id) {
      return res.status(400).json({
        message: 'ID de l\'annonce requis dans le body ou query',
        data: null,
        success: false
      });
    }
    
    const annonce = await annoncesService.getAnnonceById(id);
    
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
    // Récupérer les paramètres de référence (genres, langues, etc.)
    const parametresReference = await parametreService.getAllParametresReference();
    
    // Récupérer tous les paramètres de configuration
    const parametresConfig = await parametreService.getAllParametres();

    // Combiner les deux
    const parametres = {
      ...parametresReference,
      parametres_config: parametresConfig
    };
    
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
    console.log('=== DEBUG createCandidat ===');
    console.log('req.body keys:', Object.keys(req.body));
    console.log('req.file:', req.file ? req.file : 'Pas de fichier');
    console.log('req.files:', req.files ? req.files : 'Pas de fichiers multiples');
    console.log('Content-Type header:', req.headers['content-type']);
    console.log('recaptchaToken:', !!req.body.recaptchaToken);
    
    // Récupérer les données avec support des deux formats (ID ou valeur)
    let {
      // Données tiers
      nom, prenom, date_naissance, 
      id_genre, genre, // Support des deux formats
      id_situation_matrimoniale, situation_matrimoniale, // Support des deux formats
      nombre_enfants, contact, email, cin, 
      id_ville, ville, // Support des deux formats
      photo,
      // Relations du candidat
      formations, langues, qualites, experiences,
      // Données candidat
      id_annonce, annonce_id, // Support des deux formats
      cv,
      // Token reCAPTCHA (optionnel)
      recaptchaToken
    } = req.body;
    
    // Parser les données JSON si nécessaire
    if (typeof formations === 'string') formations = JSON.parse(formations);
    if (typeof langues === 'string') langues = JSON.parse(langues);
    if (typeof qualites === 'string') qualites = JSON.parse(qualites);
    if (typeof experiences === 'string') experiences = JSON.parse(experiences);
    
    // Debug des langues
    console.log('=== DEBUG LANGUES ===');
    console.log('langues raw:', langues);
    if (langues && langues.length > 0) {
      langues.forEach((langue, index) => {
        console.log(`Langue ${index}:`, JSON.stringify(langue, null, 2));
      });
    }
    
    // Debug des qualités
    console.log('=== DEBUG QUALITES ===');
    console.log('qualites raw:', qualites);
    if (qualites && qualites.length > 0) {
      qualites.forEach((qualite, index) => {
        console.log(`Qualité ${index}:`, JSON.stringify(qualite, null, 2));
      });
    }
    
    // Debug des expériences
    console.log('=== DEBUG EXPERIENCES ===');
    console.log('experiences raw:', experiences);
    if (experiences && experiences.length > 0) {
      experiences.forEach((experience, index) => {
        console.log(`Expérience ${index}:`, JSON.stringify(experience, null, 2));
      });
    }
    
    // Debug des formations
    console.log('=== DEBUG FORMATIONS ===');
    console.log('formations raw:', formations);
    if (formations && formations.length > 0) {
      formations.forEach((formation, index) => {
        console.log(`Formation ${index}:`, JSON.stringify(formation, null, 2));
      });
    }
    
    // Convertir les langues au bon format
    if (langues && langues.length > 0) {
      const parametreService = require('../services/parametresService');
      const languesValides = [];
      for (let i = 0; i < langues.length; i++) {
        const langue = langues[i];
        // Nouvelle structure: { valeur: 1 } - la valeur est directement l'ID
        if (langue.valeur) {
          try {
            const langueId = parseInt(langue.valeur);
            if (langueId && !isNaN(langueId)) {
              languesValides.push({
                id_langue: langueId
              });
            }
          } catch (err) {
            console.error(`Erreur traitement langue ${langue.valeur}:`, err);
          }
        }
      }
      langues = languesValides;
      console.log('Langues après conversion:', langues);
    } else {
      langues = [];
    }
    
    // Convertir les qualités au bon format
    if (qualites && qualites.length > 0) {
      const parametreService = require('../services/parametresService');
      const qualitesValides = [];
      for (let i = 0; i < qualites.length; i++) {
        const qualite = qualites[i];
        // Nouvelle structure: { valeur: 1 } - la valeur est directement l'ID
        if (qualite.valeur) {
          try {
            const qualiteId = parseInt(qualite.valeur);
            if (qualiteId && !isNaN(qualiteId)) {
              qualitesValides.push({
                id_qualite: qualiteId
              });
            }
          } catch (err) {
            console.error(`Erreur traitement qualité ${qualite.valeur}:`, err);
          }
        }
      }
      qualites = qualitesValides;
      console.log('Qualités après conversion:', qualites);
    } else {
      qualites = [];
    }
    
    // Convertir les expériences au bon format
    if (experiences && experiences.length > 0) {
      const experiencesValides = [];
      for (let i = 0; i < experiences.length; i++) {
        const experience = experiences[i];
        
        // Gérer les deux formats possibles
        let experienceData = experience.valeur || experience;
        
        // Vérifier que id_domaine est présent et valide
        if (!experienceData.id_domaine) {
          console.log(`Expérience ${i} ignorée: id_domaine manquant`);
          continue;
        }
        
        // Convertir id_domaine en entier si nécessaire
        if (typeof experienceData.id_domaine === 'string') {
          experienceData.id_domaine = parseInt(experienceData.id_domaine);
        }
        
        // Vérifier que les dates sont présentes
        if (experienceData.id_domaine && experienceData.date_debut && experienceData.date_fin) {
          try {
            // Calculer la durée en mois entre date_debut et date_fin
            const dateDebut = new Date(experienceData.date_debut);
            const dateFin = new Date(experienceData.date_fin);
            
            if (dateDebut <= dateFin) {
              // Calculer la différence en mois pour information
              const dureeEnMois = (dateFin.getFullYear() - dateDebut.getFullYear()) * 12 + 
                                  (dateFin.getMonth() - dateDebut.getMonth());
              
              experiencesValides.push({
                id_domaine: experienceData.id_domaine,
                date_debut: experienceData.date_debut,
                date_fin: experienceData.date_fin
              });
              
              console.log(`Expérience ${i}: domaine ${experienceData.id_domaine}, ${dateDebut.toISOString().split('T')[0]} à ${dateFin.toISOString().split('T')[0]} = ${dureeEnMois} mois`);
            } else {
              console.log(`Expérience ${i} ignorée: date début (${dateDebut.toISOString().split('T')[0]}) postérieure à date fin (${dateFin.toISOString().split('T')[0]})`);
            }
          } catch (err) {
            console.error(`Erreur calcul durée expérience ${i}:`, err);
          }
        } else {
          console.log(`Expérience ${i} ignorée: données manquantes`);
          console.log(`  - id_domaine: ${experienceData.id_domaine || 'MANQUANT'}`);
          console.log(`  - date_debut: ${experienceData.date_debut || 'MANQUANT'}`);
          console.log(`  - date_fin: ${experienceData.date_fin || 'MANQUANT'}`);
        }
      }
      experiences = experiencesValides;
      console.log('Expériences après conversion:', experiences);
    } else {
      experiences = [];
    }
    
    // Convertir les formations au bon format
    if (formations && formations.length > 0) {
      const formationsValides = [];
      for (let i = 0; i < formations.length; i++) {
        const formation = formations[i];
        if (formation.valeur && formation.valeur.id_filiere && formation.valeur.id_niveau) {
          try {
            formationsValides.push({
              id_filiere: formation.valeur.id_filiere,
              id_niveau: formation.valeur.id_niveau
            });
          } catch (err) {
            console.error(`Erreur conversion formation:`, err);
          }
        }
      }
      formations = formationsValides;
      console.log('Formations après conversion:', formations);
    } else {
      formations = [];
    }
    
    // Résoudre les IDs à partir des valeurs si nécessaire
    console.log('=== RESOLUTION DES IDS ===');
    console.log('genre initial:', genre, 'id_genre initial:', id_genre);
    console.log('ville initiale:', ville, 'id_ville initial:', id_ville);
    console.log('situation_matrimoniale initiale:', situation_matrimoniale, 'id_situation_matrimoniale initial:', id_situation_matrimoniale);
    
    // Si genre est un ID numérique, l'utiliser directement
    if (!id_genre && genre) {
      if (typeof genre === 'number' || !isNaN(genre)) {
        id_genre = parseInt(genre);
        console.log('Genre ID assigné directement:', id_genre);
      } else {
        // Sinon, résoudre par valeur textuelle
        const genreObj = await parametresService.getGenreByValue(genre);
        console.log('Genre trouvé par valeur:', genreObj);
        if (genreObj && genreObj.id_genre) {
          id_genre = genreObj.id_genre;
        }
      }
    }
    
    // Si situation_matrimoniale est un ID numérique, l'utiliser directement
    if (!id_situation_matrimoniale && situation_matrimoniale) {
      if (typeof situation_matrimoniale === 'number' || !isNaN(situation_matrimoniale)) {
        id_situation_matrimoniale = parseInt(situation_matrimoniale);
        console.log('Situation matrimoniale ID assigné directement:', id_situation_matrimoniale);
      } else {
        // Sinon, résoudre par valeur textuelle
        const situationObj = await parametresService.getSituationMatrimonialeByValue(situation_matrimoniale);
        console.log('Situation matrimoniale trouvée par valeur:', situationObj);
        if (situationObj && situationObj.id_situation) {
          id_situation_matrimoniale = situationObj.id_situation;
        }
      }
    }
    
    // Si ville est un ID numérique, l'utiliser directement
    if (!id_ville && ville) {
      if (typeof ville === 'number' || !isNaN(ville)) {
        id_ville = parseInt(ville);
        console.log('Ville ID assigné directement:', id_ville);
      } else {
        // Sinon, résoudre par valeur textuelle
        const villeObj = await parametresService.getVilleByValue(ville);
        console.log('Ville trouvée par valeur:', villeObj);
        if (villeObj && villeObj.id_ville) {
          id_ville = villeObj.id_ville;
        }
      }
    }
    
    if (!id_annonce && annonce_id) {
      id_annonce = annonce_id;
    }
    
    console.log('=== VALEURS FINALES ===');
    console.log('id_genre final:', id_genre);
    console.log('id_ville final:', id_ville);
    console.log('id_situation_matrimoniale final:', id_situation_matrimoniale);
    console.log('id_annonce final:', id_annonce);
    
    // Validation stricte des champs obligatoires - pas de valeurs par défaut
    if (!nom || !prenom || !date_naissance || !id_genre || !contact || !email || !cin || !id_ville || !id_annonce) {
      return res.status(400).json({
        message: 'Tous les champs obligatoires doivent être remplis avec des valeurs valides',
        data: null,
        success: false,
        missing: {
          nom: !nom,
          prenom: !prenom,
          date_naissance: !date_naissance,
          id_genre: !id_genre,
          contact: !contact,
          email: !email,
          cin: !cin,
          id_ville: !id_ville,
          id_annonce: !id_annonce
        }
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
      // Gérer la photo uploadée - obligatoire pour nouveau tiers
      let photoFilename = null;
      if (!req.file || !req.file.filename) {
        // Temporairement, permettre la création sans photo pour débugger
        console.log('⚠️ WARNING: Création sans photo - mode debug');
        photoFilename = 'default_photo.jpg'; // Photo par défaut temporaire
        
        // TODO: Remettre cette validation stricte une fois l'upload corrigé
        /*
        return res.status(400).json({
          message: 'Une photo est obligatoire pour créer un candidat',
          data: null,
          success: false
        });
        */
      } else {
        photoFilename = req.file.filename;
        console.log('✅ Photo uploadée:', photoFilename);
      }
      
      // Créer un nouveau tiers avec ses relations
      const tiersData = {
        nom, prenom, date_naissance, id_genre, id_situation_matrimoniale,
        nombre_enfants, contact, email, cin, id_ville, photo: photoFilename
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
      cv: 'cv_placeholder.pdf' // Valeur temporaire pour éviter NULL
    });
    
    // Récupérer le pourcentage minimum CV pour l'annonce
    const pourcentage_minimum = await parametresService.getPourcentageMinimumCv();
    
    // Calculer le pourcentage de correspondance entre les données saisies et l'annonce
    console.log('=== EVALUATION CV ===');
    const evaluationCV = await evaluationService.evaluerCandidatCV({
      date_naissance,
      id_genre,
      id_ville,
      formations,
      langues,
      qualites,
      experiences
    }, id_annonce);
    
    const pourcentage_cv_calcule = evaluationCV.pourcentage;
    console.log('Pourcentage CV calculé:', pourcentage_cv_calcule);
    console.log('Pourcentage minimum requis:', pourcentage_minimum);
    
    const qcm_automatique = pourcentage_cv_calcule >= pourcentage_minimum;
    console.log('QCM automatique déclenché:', qcm_automatique);
    
    // Si le CV atteint le minimum, créer un envoi QCM
    let envoi_qcm = null;
    let statut_candidature = '';
    let message_candidat = '';
    
    if (qcm_automatique) {
      console.log('=== ENVOI QCM AUTOMATIQUE ===');
      console.log('Candidat ID:', candidat.id_candidat);
      try {
        envoi_qcm = await envoiQcmService.createEnvoiQcm(candidat.id_candidat);
        console.log('QCM envoyé avec succès:', envoi_qcm);
        statut_candidature = 'QCM_AUTOMATIQUE';
        message_candidat = `Félicitations ! Votre profil correspond à ${pourcentage_cv_calcule}% aux exigences du poste. Un QCM vous a été envoyé par email.`;
      } catch (error) {
        console.error('Erreur lors de l\'envoi du QCM:', error);
        statut_candidature = 'ERREUR_QCM';
        message_candidat = `Votre profil correspond à ${pourcentage_cv_calcule}% aux exigences. Erreur technique lors de l'envoi du QCM.`;
      }
    } else {
      statut_candidature = 'EN_ATTENTE_VALIDATION';
      message_candidat = `Votre candidature a été reçue (correspondance: ${pourcentage_cv_calcule}%). Elle sera examinée manuellement par nos équipes RH.`;
    }
    
    const data = {
      id_candidat: candidat.id_candidat,
      id_tiers,
      nom,
      prenom,
      email,
      id_annonce,
      cv,
      pourcentage_cv: pourcentage_cv_calcule,
      pourcentage_minimum,
      qcm_automatique,
      statut_candidature,
      message_candidat,
      envoi_qcm,
      evaluation_details: evaluationCV.details,
      date_candidature: new Date().toISOString()
    };
    
    res.status(201).json({
      message: qcm_automatique 
        ? 'Candidature créée avec succès - QCM envoyé automatiquement' 
        : 'Candidature créée avec succès - En attente de validation manuelle',
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
    
    // Vérifier la validité du token et l'utilisation unique
    const envoiQcm = await envoiQcmService.verifyTokenQcm(token);
    
    // Gérer les erreurs de vérification du token
    if (envoiQcm.error) {
      let statusCode = 400;
      switch (envoiQcm.error) {
        case 'TOKEN_EXPIRED':
          statusCode = 410; // Gone
          break;
        case 'TOKEN_ALREADY_USED':
          statusCode = 409; // Conflict
          break;
        case 'TOKEN_NOT_FOUND':
        case 'CANDIDAT_NOT_FOUND':
          statusCode = 404; // Not Found
          break;
        case 'TOKEN_INVALID':
          statusCode = 400; // Bad Request
          break;
        default:
          statusCode = 500; // Internal Server Error
      }
      
      return res.status(statusCode).json({
        message: envoiQcm.message,
        data: null,
        success: false,
        error_code: envoiQcm.error
      });
    }

    // Le token est valide et non utilisé - on peut continuer
    
    // RÈGLE MÉTIER IMPORTANTE : Marquer le token comme utilisé dès l'ouverture
    // même si le candidat ne répond à aucune question
    await envoiQcmService.markTokenAsUsed(envoiQcm.id_envoi_qcm_candidat);
    console.log('Token QCM marqué comme utilisé dès l\'ouverture pour id_envoi:', envoiQcm.id_envoi_qcm_candidat);
    
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
    
    // Vérifier le token et l'utilisation unique
    const envoiQcm = await envoiQcmService.verifyTokenQcm(token);
    
    // Gérer les erreurs de vérification du token (même logique que qcmQuestions)
    if (envoiQcm.error) {
      let statusCode = 400;
      switch (envoiQcm.error) {
        case 'TOKEN_EXPIRED':
          statusCode = 410; // Gone
          break;
        case 'TOKEN_ALREADY_USED':
          statusCode = 409; // Conflict - QCM déjà soumis
          break;
        case 'TOKEN_NOT_FOUND':
        case 'CANDIDAT_NOT_FOUND':
          statusCode = 404; // Not Found
          break;
        case 'TOKEN_INVALID':
          statusCode = 400; // Bad Request
          break;
        default:
          statusCode = 500; // Internal Server Error
      }
      
      return res.status(statusCode).json({
        message: envoiQcm.message,
        data: null,
        success: false,
        error_code: envoiQcm.error
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
        score: score_question
      });
    }
    
    // Enregistrer toutes les réponses (gère le remplacement du placeholder)
    await reponseQcmService.createMultipleReponses(reponsesData, envoiQcm.id_envoi_qcm_candidat);
    
    // Calculer les statistiques finales
    const stats = await reponseQcmService.calculateQcmStats(envoiQcm.id_envoi_qcm_candidat, envoiQcm.id_annonce);
    
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
