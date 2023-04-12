const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Sign up a new user
router.post('/signup', authMiddleware, userController.createUser);

// Log in an existing user
router.post('/login', authMiddleware,userController.login);

// Get the currently authenticated user
router.get('/me', authMiddleware, userController.getCurrentUser);

// Get a user by ID
router.get('/:id', authMiddleware, userController.getUserById);

// Update a user by ID
router.put('/:id', authMiddleware, userController.updateUser);

// Delete a user by ID
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
