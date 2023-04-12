const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const commentController = require('../controllers/commentController');

router.post('/comments', authMiddleware, commentController.createComment);
router.get('/comments/:ticketId', authMiddleware, commentController.getCommentsByTicketId);

module.exports = router;
