const express = require('express');
const router = express.Router();
const uniteController = require('../controllers/uniteController');

// liste annonce(components) PAR UNITE
router.get('/annonces', uniteController.getAllAnnonces);
// fiche annonce
router.get('/annonce', uniteController.getAnnonceById);

router.get('/annonces-unite', uniteController.getAllAnnoncesUnite);
router.get('/annonce-unite', uniteController.getAnnonceByIdUnite);
// fiche candidat
router.get('/candidat-unite', uniteController.getCandidatByIdUnite);
// table envoi qcm candidat(email)
router.post('/send/qcm-candidat', uniteController.sendQcmCandidat);
// table unite_entretien, status_unite_entretien(a venir id=1), envoi email 
router.post('/send/unite-entretien', uniteController.sendUniteEntretien);

// // liste d entretiens par jour
// router.get('/unite_entretiens_jour', uniteController.getAllUniteEntretiensParJour);;
// // ajouter dans status_unite_entretien (termine id=2/en attente de validation id=3)
// router.post('/update/status/unite_entretien', uniteController.updateStatusUniteEntretien);
// // ajouter score dans score_unite_entretien
// router.post('/create/score/unite_entretien', uniteController.createScoreUniteEntretien);


// pour se connecter et recuperer les infos de l'unite
router.get('/', uniteController.getAllUnites);
// verification et retour de id
router.post('/login', uniteController.loginUnite);
router.get('/id/:id', uniteController.getUniteById);

// dans parametrages des besoins (CR)
router.get('/parametres', uniteController.getAllParametres);
router.get('/postesByUnite/:id', uniteController.getPostesByIdUnite);
router.get('/questionsReponses', uniteController.getQuestionsReponses);
router.get('/qcmAnnonce/:id', uniteController.getQCMAnnonce);
router.get('/languesAnnonce/:id', uniteController.getLanguesByAnnonce);
router.get('/getLangueById/:id', uniteController.getLangueById);
router.get('/detailsAnnonceById/:id', uniteController.getDetailsAnnonceById);
router.post('/annonces', uniteController.getAllAnnonces);
router.get('/detailsHistoriqueAnnonce/:id', uniteController.getDetailsHistorique);
router.get('/detailsQRAnnonce/:id', uniteController.getDetailsQR);

// partie C du parametrages
router.post('/create/poste', uniteController.createPoste);
router.put('/update/poste', uniteController.updatePoste);
router.post('/create/genre', uniteController.createGenre);
router.post('/create/ville', uniteController.createVille);
router.post('/create/niveau', uniteController.createNiveau);
router.post('/create/filiere', uniteController.createFiliere);
router.post('/create/domaine', uniteController.createDomaine);
router.post('/create/langue', uniteController.createLangue);
router.post('/create/qualite', uniteController.createQualite);
router.post('/create/situation_matrimoniale', uniteController.createSituationMatrimoniale);
router.post('/create/qcm', uniteController.createQcm);
router.post('/create/questions', uniteController.createQuestionQcm);
router.post('/create/reponses', uniteController.createReponseQcm);


// table annonce, qcm annonce, status_annonce, competences_annonce + status en attente
router.post('/create/annonce', uniteController.createAnnonce);
router.post('/create/statusAnnonce', uniteController.statusAnnonce);
router.post('/add/niveau_filiere', uniteController.addNiveauFiliere);
router.post('/add/experienceAnnonce', uniteController.addExperienceAnnonce);
router.post('/add/langues', uniteController.addLanguesAnnonce);
router.post('/add/qualites', uniteController.addQualitesAnnonce);

// table envoi qcm candidat(email)
// router.post('/create/qcm_candidat', uniteController.createQcmCandidat);

// table unite_entretien, status_unite_entretien(a venir id=1), envoi email 
router.post('/create/unite_entretien', uniteController.createUniteEntretien);

// liste d entretiens par jour
router.get('/unite_entretiens_jour', uniteController.getAllUniteEntretiensParJour);

// suggestion a la RH 
router.post('/suggest/rh', uniteController.suggestToRh);

// liste des suggestions envoyées à la RH
router.get('/suggest', uniteController.getAllRhSuggestions);

module.exports = router;
module.exports = router;
