const express = require('express');
const router = express.Router();
const rhController = require('../controllers/rhController');

// email + mdp a verfieer par rapport au post retour true/false
router.post('/', rhController.loginRh);

// anonces a valier ou invalider dans status
router.get('/create/annonce', rhController.createAnnonce);

// les suggestions des unites sont des demandes de entretien avec rh pour qu ce dernier decide de ce qu il faut faire
router.get('/suggestions', rhController.getAllSuggests);

// table rh_entretien, status_rh_entretien(a venir id=1), envoi email 
router.post('/create/rh_entretien', rhController.createRhEntretien);

// liste d entretiens par jour
router.get('/rh_entretiens_jour', rhController.getAllRhEntretiensParJour);

// modifier entretien unite a la date
router.post('/update/date/rh_entretien', rhController.updateDateRhEntretien);

// ajouter dans status_rh_entretien (termine id=2/en attente de validation id=3)
router.post('/update/status/rh_entretien', rhController.updateStatusRhEntretien);

// Nouvelles fonctionnalités combinées
router.post('/disponibilites/rh', rhController.getDisponibilitesRh);  // pour vérifier les créneaux libres
router.post('/reserve/rh_entretien', rhController.reserveEntretienRh); // mettre à jour date + statut
router.post('/prochaine_disponibilite/rh', rhController.getProchaineDisponibiliteRh); // pour vérifier la prochaine disponibilité


// ajouter score dans score_rh_entretien
router.post('/create/score/rh_entretien', rhController.createScoreRhEntretien);


// suggestion au ceo
router.post('/suggest/ceo', rhController.suggestToCeo);

// liste suggestions
router.get('/suggest/', rhController.getAllCeoSuggestions);

module.exports = router;
