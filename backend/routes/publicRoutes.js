const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.get('/', publicController.getAllPublics);
router.post('/', publicController.loginPublic);
router.get('/:id', publicController.getPublicById);

module.exports = router;
