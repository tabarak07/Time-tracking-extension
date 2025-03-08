const express = require('express');
const router = express.Router();

/**
 * GET all users.
 */
router.get('/', (req, res) => {
  res.json({ message: "User resource endpoint" });
});

/**
 * POST to create a new user.
 */
router.post('/', (req, res) => {
  res.json({ message: "Create a new user" });
});

/**
 * PUT to update a user by ID.
 */
router.put('/:id', (req, res) => {
  res.json({ message: `Update user with ID ${req.params.id}` });
});

/**
 * DELETE to remove a user by ID.
 */
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete user with ID ${req.params.id}` });
});

module.exports = router;
