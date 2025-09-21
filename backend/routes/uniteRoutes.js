const express = require('express');
const router = express.Router();
const uniteController = require('../controllers/uniteController');

// liste annonce(components) PAR UNITE
router.get('/annonces', uniteController.getAllAnnonces);

// fiche annonce
router.get('/annonce/:id', uniteController.getAnnonceById);

// fiche candidat
router.get('/candidat/:id', uniteController.getCandidatById);

// // table envoi qcm candidat(email)
// router.post('/create/qcm_candidat', uniteController.createQcmCandidat);
// // table unite_entretien, status_unite_entretien(a venir id=1), envoi email 
// router.post('create/unite_entretien', uniteController.createUniteEntretien);

// // liste d entretiens par jour
// router.get('unite_entretiens_jour', uniteController.getAllUniteEntretiensParJour);
// // modifier entretien unite a la date
// router.post('update/date/unite_entretien', uniteController.updateDateUniteEntretien);
// // ajouter dans status_unite_entretien (termine id=2/en attente de validation id=3)
// router.post('update/status/unite_entretien', uniteController.updateStatusUniteEntretien);
// // ajouter score dans score_unite_entretien
// router.post('create/score/unite_entretien', uniteController.createScoreUniteEntretien);

// // suggestion a la RH
// router.post('/suggest/rh', uniteController.suggestToRh);
// // liste suggestions
// router.get('/suggest/', uniteController.getAllRhSuggestions);

module.exports = router;  
