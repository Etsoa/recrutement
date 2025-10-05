const express = require('express');
const router = express.Router();
const statController = require('../controllers/statController');
const uniteController = require('../controllers/uniteController');

// Routes pour les statistiques
router.post('/getStatistique', statController.getAllStats);
router.get('/getStatistique', statController.getAllStats2);
router.post('/getStatsByUnite', statController.getStatsByUnite);
router.post('/getRhStats', statController.getRhStats);
router.get('/param', uniteController.getAllParametres);

module.exports = router;  
