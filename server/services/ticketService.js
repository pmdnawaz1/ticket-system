const Ticket = require('../models/Ticket');
const ApiError = require('../utils/apiError');

const createTicket = async (data, userId) => {
  try {
    const ticket = new Ticket({ ...data, user: userId });
    await ticket.save();
    return ticket;
  } catch (err) {
    throw new ApiError(err.message, 500);
  }
};

const getTickets = async (userId) => {
  try {
    const tickets = await Ticket.find({ user: userId });
    return tickets;
  } catch (err) {
    throw new ApiError(err.message, 500);
  }
};

const getTicketById = async (id, userId) => {
  try {
    const ticket = await Ticket.findOne({ _id: id, user: userId });
    if (!ticket) {
      throw new ApiError('Ticket not found', 404);
    }
    return ticket;
  } catch (err) {
    if (err.name === 'CastError') {
      throw new ApiError('Invalid ticket ID', 400);
    }
    throw new ApiError(err.message, 500);
  }
};

const updateTicketById = async (id, data, userId) => {
  try {
    const ticket = await Ticket.findOneAndUpdate({ _id: id, user: userId }, data, { new: true });
    if (!ticket) {
      throw new ApiError('Ticket not found', 404);
    }
    return ticket;
  } catch (err) {
    if (err.name === 'CastError') {
      throw new ApiError('Invalid ticket ID', 400);
    }
    throw new ApiError(err.message, 500);
  }
};

const deleteTicketById = async (id, userId) => {
  try {
    const ticket = await Ticket.findOneAndDelete({ _id: id, user: userId });
    if (!ticket) {
      throw new ApiError('Ticket not found', 404);
    }
    return ticket;
  } catch (err) {
    if (err.name === 'CastError') {
      throw new ApiError('Invalid ticket ID', 400);
    }
    throw new ApiError(err.message, 500);
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketById,
  deleteTicketById,
};
