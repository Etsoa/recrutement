const express = require('express');
const router = express.Router();
const uniteController = require('../controllers/uniteController');

// pour se connecter et recuperer les infos de l'unite
router.get('/', uniteController.getAllUnites);
// verification et retour de id
router.post('/', uniteController.loginUnite);
router.get('/:id', uniteController.getUniteById);

// dans parametrages des besoins (CR)
router.get('/parametres', uniteController.getAllParametres);

// partie C du parametrages
router.post('/create/genre', uniteController.createGenre);
router.post('/create/situation_matrimoniale', uniteController.createSituationMatrimoniale);
router.post('/create/langue', uniteController.createLangue);
router.post('/create/filiere', uniteController.createFiliere);
router.post('/create/niveau', uniteController.createNiveau);
router.post('/create/qualite', uniteController.createQualite);
router.post('/create/domaine', uniteController.createDomaine);
router.post('/create/poste', uniteController.createPoste);
router.post('/create/ville', uniteController.createVille);
router.post('/create/qcm', uniteController.createQcm);

// table annonce, qcm annonce, status_annonce, competences_annonce + status en attente
router.post('/create/annonce', uniteController.createAnnonce);

// liste annonce(components)
router.get('/annonces', uniteController.getAllAnnonces);
// fiche annonce
router.get('/annonces/:id', uniteController.getAnnonceById);
// table envoi qcm candidat(email)
router.post('/create/qcm_candidat', uniteController.createQcmCandidat);

// table unite_entretien, status_unite_entretien(a venir id=1), envoi email 
router.post('create/unite_entretien', uniteController.createUniteEntretien);
// liste d entretiens par jour
router.get('unite_entretiens_jour', uniteController.getAllUniteEntretiensParJour);
// modifier entretien unite a la date
router.post('update/date/unite_entretien', uniteController.updateDateUniteEntretien);
// ajouter dans status_unite_entretien (termine id=2/en attente de validation id=3)
router.post('update/status/unite_entretien', uniteController.updateStatusUniteEntretien);
// ajouter score dans score_unite_entretien
router.post('create/score/unite_entretien', uniteController.createScoreUniteEntretien);

// suggestion a la RH
router.post('/suggest/rh', uniteController.suggestToRh);
// liste suggestions
router.get('/suggest/', uniteController.getAllRhSuggestions);

module.exports = router;
