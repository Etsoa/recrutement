const express = require('express');
const router = express.Router();
const ceoController = require('../controllers/ceoController');

router.get('/', ceoController.getAllCeos);
router.post('/', ceoController.loginCeos);
router.get('/:id', ceoController.getCeosById);

module.exports = router;
