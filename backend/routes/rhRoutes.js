const express = require('express');
const router = express.Router();
const rhController = require('../controllers/rhController');

router.get('/', rhController.getAllRhs);
router.post('/', rhController.loginRh);
router.get('/:id', rhController.getRhById);

module.exports = router;
