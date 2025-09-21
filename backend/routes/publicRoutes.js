const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');
const uploadController = require('../controllers/uploadController');
const { uploadPhoto } = require('../middleware/uploadMiddleware');

// liste des annonces 
router.get('/annonces', publicController.getAllAnnonces);

// fiche annonce (l'id est envoyé dans le body ou query)
router.post('/annonce', publicController.getAnnonceById);
// dans parametrages pour remplir le dossier
router.get('/parametres', publicController.getAllParametres);

// creer tiers + candidats ou candidats eulements is cin existant
// si cv par rapport a pourcentage_minimum_cv a annonce alors : envoi de qcm sinon attente de validation manuelle
router.post('/create/candidat', publicController.createCandidat);

// Routes pour l'upload de fichiers
router.post('/upload/photo', uploadPhoto, uploadController.uploadProfilePhoto);
router.delete('/upload/photo/:filename', uploadController.deletePhoto);

// entrer de token, verfication si non utilise(reponse_qcm vide) et envoie du bon qcm selon annonce
// router.post('/qcm/questions', publicController.qcmQuestions);

// si candidats jusqu a la fin un pdf de ces reponses stoces,
// score calcules aprmis les bonnnes reponses trouve susr les bonnes reponses dans les questions rabattes sur 20 et chronometres depuis le token mis en place jusqu au clic du bouton valider
// sinon si quitte le site alors score 0 => signe que token deja utlise
// router.post('/qcm/reponses', publicController.qcmReponses);

module.exports = router;
