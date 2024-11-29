const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    bookingFormId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookingform',
        required: true
    },
    bookingdetails:
        {
            bookingtype:{
                type : String,
                required : true
            },

            eventtype :{
                type : String,
                required : true
            },

            hallname :{
                type : String,
                required : true
            },

            noofguest:{
                type : Number,
                required : true
            },
    
            date:{
                type : Date,
                required : true
            },
        
            timefrom:{
                type : String,
                required : true
            },
        
            timeto:{
                type : String,
                required : true
            },

            interestservice:{
                type : String,
                required : true
            },
        
            otherinformation:{
                type : String,
                //required : false
            },

            name: {
                type: String,
                required: true
            },

            address: {
                type: String,
                required: true
            },

            email: {
                type: String,
                required: true
            },

            phoneno: {
                type: Number,
                required: true
            },

            cenfirmdate:{
                type : Date,
                required : true
            }

        },
        contactdetails: {
            firstname: {
                type: String,
                required: true
            },
    
            lastname: {
                type: String,
                required: true
            },
    
            streetaddress: {
                type: String,
                required: true
            },
    
            state: {
                type: String,
                required: true
            },
    
            city: {
                type: String,
                required: true
            },
    
            postcode: {
                type: String,
                required: true
            },
    
            country: {
                type: String,
                required: true
            },
    
            email: {
                type: String,
                required: true
            },
    
            phoneno: {
                type: Number,
                required: true
            }
        }
    
})

let Event = mongoose.model('event',eventSchema)
module.exports= Event;

/*
const BookingForm = require('../models/bookingFormmodel'); // Path to your booking form model
const Event = require('../models/eventmodel'); // Path to your event model

exports.approveBooking = catchAsyncError(async (req, res, next) => {
    const bookingform = await BookingForm.findById(req.params.id);

    if (!bookingform) {
        return res.status(404).json({
            success: false,
            message: "Booking form not found"
        });
    }

    // Create the event object by combining fields from bookingform
    const eventData = {
        eventdetails: {
            bookingtype: bookingform.bookingdetails.bookingtype,
            eventtype: bookingform.bookingdetails.eventtype,
            hallname: bookingform.bookingdetails.hallname,
            noofguest: bookingform.bookingdetails.noofguest,
            date: bookingform.bookingdetails.date,
            timefrom: bookingform.bookingdetails.timefrom,
            timeto: bookingform.bookingdetails.timeto,
            interestservice: bookingform.bookingdetails.interestservice,
            otherinformation: bookingform.bookingdetails.otherinformation,

            // Combining firstname and lastname to form the full name
            name: `${bookingform.contactdetails.firstname} ${bookingform.contactdetails.lastname}`,

            // Combining the address fields to form a full address
            address: `${bookingform.contactdetails.streetaddress}, ${bookingform.contactdetails.city}, ${bookingform.contactdetails.state}, ${bookingform.contactdetails.postcode}, ${bookingform.contactdetails.country}`,

            email: bookingform.contactdetails.email,
            phoneno: bookingform.contactdetails.phoneno,
            confirmdate: new Date() // You can set this to the current date or another logic
        }
    };

    // Insert the eventData into the Event model
    const event = await Event.create(eventData);

    res.status(201).json({
        success: true,
        event
    });
});

*/