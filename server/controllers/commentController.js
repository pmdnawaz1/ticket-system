const { validationResult } = require('express-validator');
const { Comment } = require('../models/Comment');

const createComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.validationErrors = errors.array();
      throw error;
    }

    const { ticketId, content } = req.body;
    const userId = req.user.id;
    const comment = new Comment({ ticketId, userId, content });
    await comment.save();
    res.status(201).json({ message: 'Comment created', comment });
  } catch (error) {
    next(error);
  }
};

const getCommentsByTicketId = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const comments = await Comment.find({ ticketId }).populate('userId', 'name');
    res.json({ comments });
  } catch (error) {
    next(error);
  }
};

module.exports = { createComment, getCommentsByTicketId };
