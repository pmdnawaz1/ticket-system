const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a ticket
router.post('/', authMiddleware, ticketController.createTicket);

// Get all tickets
router.get('/', authMiddleware, ticketController.getAllTickets);

// Get a ticket by ID
router.get('/:id', authMiddleware, ticketController.getTicketById);

// Update a ticket by ID
router.put('/:id', authMiddleware, ticketController.updateTicketById);

// Delete a ticket by ID
router.delete('/:id', authMiddleware, ticketController.deleteTicketById);

module.exports = router;
