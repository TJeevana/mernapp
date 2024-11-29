const express = require('express');
const UserController = require('../controllers/UserController'); // Ensure this path is correct
const router = express.Router();

// User registration
router.post('/register1', UserController.registerUser);

// User management
router.get('/users', UserController.getAllUsers); // Corrected method name to getAllUsers
router.put('/approveAgent/:userId', UserController.approveAgent); // Approve agent
router.put('/rejectAgent/:userId', UserController.rejectAgent); // Reject agent
router.put('/updateUserRole/:userId', UserController.updateUserRole); // Update user role

module.exports = router;
