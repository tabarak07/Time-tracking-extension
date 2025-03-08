require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');
const logRouter = require('./routes/logRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Connect to MongoDB
connectDB();

// Mount routes
app.use('/', logRouter);

// Export the app instance
module.exports = app; // Ensure the app is exported