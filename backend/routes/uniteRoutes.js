const express = require('express');
const router = express.Router();
const uniteController = require('../controllers/uniteController');

router.get('/', uniteController.getAllUnites);
router.post('/', uniteController.loginUnite);
router.get('/:id', uniteController.getUniteById);

module.exports = router;
