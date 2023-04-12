const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const helmet = require('helmet');
const compression = require('compression');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose')

// Load environment variables from .env file
dotenv.config();

// Connect to database
mongoose.connect('mongodb+srv://pmdnawaz1:Yarasool12@cluster0.vbrmysz.mongodb.net/login?retryWrites=true&w=majority',(err)=>{
  console.log("Connection Success");
}
);

// Initialize Express app
const app = express();

// Set up middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(helmet());
app.use(compression());

// Set up routes
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
