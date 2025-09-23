const express = require('express');
const router = express.Router();
const statController = require('../controllers/statController');
const uniteController = require('../controllers/uniteController');

// // pour se connecter et recuperer les infos de l'unite
router.post('/getStatistique', statController.getAllStats);
router.get('/getStatistique', statController.getAllStats2);
router.get('/param', uniteController.getAllParametres);
// // verification et retour de id
// router.post('/login', uniteController.loginUnite);
// router.get('/id/:id', uniteController.getUniteById);

module.exports = router;  
