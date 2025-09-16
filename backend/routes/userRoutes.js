const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

// Protected routes
router.post('/', authMiddleware, userController.createUser);

module.exports = router;
