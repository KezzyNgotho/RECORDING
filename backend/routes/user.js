const express = require('express');
const router = express.Router();

// Define GET route to fetch user data
router.get('/users', (req, res) => {
  // Logic to fetch user data from MongoDB and send response
  res.send('Get user data');
});

// Define POST route to create a new user
router.post('/users', (req, res) => {
  // Logic to create a new user in MongoDB and send response
  res.send('Create new user');
});

// Export the router object
module.exports = router;
