const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require('../middlewares/authenticate');
const { newBooking, myBooking,updateBookingStatus,getBooking, checkBookingStatus,deleteBooking ,updateBookingSection} = require('../controllers/bookingController');

// Route to create a new booking
router.post('/bookingform/new',newBooking);

// Route to get the logged-in user's bookings
router.post('/myBooking',myBooking)
router.get('/getBooking',getBooking)

router.put('/bookings/:id',updateBookingStatus);
router.post('/booking/status', checkBookingStatus);
router.delete('/bookings/:id', deleteBooking);

router.put('/booking/update/:id', updateBookingSection);


module.exports = router;
