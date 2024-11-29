const express = require('express');
const {newEvent} = require('../controllers/eventController'); // Ensure the path is correct

const router = express.Router();

// Ensure that the route handlers are correctly attached to the routes
router.post('/event/',newEvent)


module.exports = router;
