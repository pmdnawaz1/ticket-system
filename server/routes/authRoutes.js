const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const ticketController = require('../controllers/ticketController');
const userController = require('../controllers/userController');

// Tickets routes
router.post('/tickets', authMiddleware, ticketController.createTicket);
router.get('/tickets', authMiddleware, ticketController.getAllTickets);
router.get('/tickets/:id', authMiddleware, ticketController.getTicketById);
router.put('/tickets/:id', authMiddleware, ticketController.updateTicketById);
router.delete('/tickets/:id', authMiddleware, ticketController.deleteTicketById);

// Users routes
router.post('/users', userController.createUser);
router.post('/users/login', userController.login);

module.exports = router;
