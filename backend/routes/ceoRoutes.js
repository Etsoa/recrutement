const express = require('express');
const router = express.Router();
const ceoController = require('../controllers/ceoController');

// email + mdp a verfier par rapport au post retour true/false
router.post('/', ceoController.loginCeo);

// les suggestions du rh a donner un contrat au candidat
router.get('/suggestions', ceoController.getAllSuggests);

// employe cree, status employe actif, contrat d essai verfiier et ajouter, email de contrat envoyer
// router.post('recruter', ceoController.recruter);

//liste des emqloyes status machin machin sous forme d'arbre qar unite
router.get('/employes', ceoController.getAllEmployes);

router.get('/suggestions-waiting', ceoController.getAllSuggestsWaitingValidation);

// router.post('/validate-suggestion');
router.post('/reject-suggestion', ceoController.refuserSuggestion)

module.exports = router;
