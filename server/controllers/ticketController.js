const Ticket = require("../models/Ticket");
const User = require("../models/User");
const { validationResult } = require("express-validator");

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("user", "name");
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get a ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate(
      "user",
      "name"
    );
    if (!ticket) {
      return res.status(404).json({ msg: "Ticket not found" });
    }
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Ticket not found" });
    }
    res.status(500).send("Server Error");
  }
};

// Create a new ticket
exports.createTicket = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description } = req.body;

    // Create new ticket instance
    const ticket = new Ticket({
      title,
      description
    });

    // Save the ticket to the database
    await ticket.save();

    // Populate the ticket with the user's name
    await ticket.populate("user", "name").execPopulate();

    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update a ticket by ID
exports.updateTicketById = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description } = req.body;

    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: "Ticket not found" });
    }

    // Make sure the authenticated user is the owner of the ticket being updated
    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    ticket.title = title;
    ticket.description = description;

    await ticket.save();

    await ticket.populate("user", "name").execPopulate();

    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Ticket not found" });
    }
    res.status(500).send("Server Error");
  }
};

// Delete a ticket by ID
exports.deleteTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: "Ticket not found" });
    }

    // Make sure the authenticated user is the same as the ticket creator
    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await ticket.remove();
    res.json({ msg: "Ticket removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Ticket not found" });
    }
    res.status(500).send("Server Error");
  }
};
