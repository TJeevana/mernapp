
const express = require('express');
const { getbookingforms, newBookingForm, updateBookingForm, deletebookingform,approveBookingForm,rejectBookingForm } = require('../controllers/bookingFormController');
//const { db } = require('../models/bookingFormmodel');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/authenticate');

router.route('/bookingform').get(isAuthenticatedUser, authorizeRoles('admin'),getbookingforms);
router.route('/bookingform/new').post(isAuthenticatedUser,authorizeRoles('member','agent'),newBookingForm);
router.route('/bookingform/:id').put(isAuthenticatedUser, authorizeRoles('admin'),updateBookingForm);
router.route('/bookingform/:id').delete(isAuthenticatedUser, authorizeRoles('admin'),deletebookingform);

/*
// PUT approve a booking form and create an event
router.route('/bookingform/:id/approve').put(approveBookingForm);

// PUT reject a booking form
router.route('/bookingform/:id/reject').put(rejectBookingForm);
*/
module.exports = router;
