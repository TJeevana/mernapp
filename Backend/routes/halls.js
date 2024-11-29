// backend/routes/hall.js
const express = require('express');
const { gethalls, newHall, updateHall, deleteHall, getSingleHall, createReview, getReviews } = require('../controllers/hallController');
const router = express.Router();

// Route to get all halls
router.get('/hall', gethalls);

// Route to create a new hall
router.post('/hall/new', newHall);

// Route to get a single hall by ID
router.get('/hall/:id', getSingleHall);

// Route to update a hall by ID
router.put('/hall/:id', updateHall);

// Route to delete a hall by ID
router.delete('/hall/:id', deleteHall);

// Route to create a review
router.post('/review', createReview);

// Uncomment if you want to implement reviews retrieval
// router.get('/reviews', getReviews);

module.exports = router;
