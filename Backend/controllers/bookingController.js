const catchAsyncError = require('../middlewares/catchAsyncError');
const BookingForm = require('../models/bookingFormmodel');
const ErrorHandler = require('../utils/errorHandler');
const mongoose = require('mongoose'); // Ensure mongoose is imported

// Create New Booking Form - POST: /api/v1/bookingform/new
exports.newBooking = catchAsyncError(async (req, res, next) => {
    const { bookingdetails, contactdetails, role, userId } = req.body;
    const objectId = new mongoose.Types.ObjectId(userId);

    const newBooking = await BookingForm.create({
        bookingdetails,
        contactdetails,
        role,
        user: userId 
    });

    res.status(201).json({
        success: true,
        message: 'Booking request created successfully',
        booking: newBooking
    });
});

// Get all bookings for the logged-in user - POST: /api/v1/myBooking
exports.myBooking = catchAsyncError(async (req, res, next) => {
    const { userId } = req.body;

    const bookings = await BookingForm.find({ user: userId }); // Find all bookings for this user

    res.status(200).json({
        success: true,
        bookings,
    });
});

// Get all bookings (Admin use case) - GET: /api/v1/bookings
exports.getBooking = catchAsyncError(async (req, res, next) => {
    const bookings = await BookingForm.find();

    res.status(200).json({
        success: true,
        bookings,
    });
});

// Update booking status (Admin or agent use case) - PUT: /api/v1/booking/:id
exports.updateBookingStatus = catchAsyncError(async (req, res, next) => {
    const { bookingStatus } = req.body;
    const booking = await BookingForm.findByIdAndUpdate(
        req.params.id,
        { bookingStatus },
        { new: true, runValidators: true }
    );

    if (!booking) {
        return res.status(404).json({
            success: false,
            message: 'Booking not found',
        });
    }

    res.status(200).json({
        success: true,
        message: `Booking status updated to ${bookingStatus}`,
        booking,
    });
});

// Check if a member has already booked today - POST: /api/v1/booking/status
exports.checkBookingStatus = catchAsyncError(async (req, res, next) => {
    const { userId, role } = req.body;

    if (role === 'member') {
        const today = new Date().setHours(0, 0, 0, 0); 
        const booking = await BookingForm.findOne({
            user: userId,
            createdAt: {
                $gte: today, 
                $lt: new Date(today).setDate(new Date(today).getDate() + 1), 
            },
        });

        if (booking) {
            return res.status(200).json({ success: true, booked: true });
        }
    }

    res.status(200).json({ success: true, booked: false });
});


exports.updateBookingSection = catchAsyncError(async (req, res, next) => {
    const updatedData = req.body; 

   
    const booking = await BookingForm.findByIdAndUpdate(
        req.params.id,
        { $set: updatedData }, 
        { new: true, runValidators: true }
    );

    if (!booking) {
        return res.status(404).json({
            success: false,
            message: 'Booking not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Booking updated successfully',
        booking,
    });
});


// Delete a booking - DELETE: /api/v1/booking/:id
exports.deleteBooking = catchAsyncError(async (req, res, next) => {
    const booking = await BookingForm.findById(req.params.id);

    if (!booking) {
        return next(new ErrorHandler('Booking not found', 404));
    }

    // Use findByIdAndDelete instead of remove
    await BookingForm.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Booking deleted successfully',
    });
});
