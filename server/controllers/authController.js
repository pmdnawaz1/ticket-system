const { validationResult } = require('express-validator');
const { User } = require('../models');
const { signToken } = require('../config/jwt');
const { sendMail } = require('../utils/emailUtils');
const { SMTP_USER } = require('../config/env');

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.validationErrors = errors.array();
      throw error;
    }

    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('Email already exists');
      error.statusCode = 409;
      throw error;
    }

    const user = new User({ name, email, password });
    await user.save();
    const token = signToken({ id: user.id });
    const message = {
      from: SMTP_USER,
      to: email,
      subject: 'Welcome to Ticketing System',
      html: `<p>Hi ${name},</p>
             <p>Thank you for registering with Ticketing System. We're excited to have you on board!</p>`
    };
    await sendMail(message);
    res.status(201).json({ message: 'User created', token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.validationErrors = errors.array();
      throw error;
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('Email or password incorrect');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
      const error = new Error('Email or password incorrect');
      error.statusCode = 401;
      throw error;
    }

    const token = signToken({ id: user.id });
    res.json({ message: 'Logged in successfully', token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
