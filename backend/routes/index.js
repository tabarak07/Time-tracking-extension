// routes/index.js
const express = require('express');
const router = express.Router();

// Route to serve the home page
router.get('/', (req, res, next) => {
  try {
    res.render('index', { title: 'Home Page', message: 'Welcome to the Productivity App!' });
  } catch (error) {
    next(error); // Pass error to the error handler
  }
});

// Export the router
module.exports = router;
