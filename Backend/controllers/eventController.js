//eventController.js
const Event = require('../models/eventmodel');
const BookingForm = require('../models/bookingFormmodel');
const catchAsyncError = require('../middlewares/catchAsyncError');

//GetEvent - http://localhost:8000/api/v1/event
exports.getevents = catchAsyncError(async(req,res,next)=>{
  const events=await Event.find();
   res.status(200).json({
       success : true,
       events
   });
});

/*
// Create a new event from a confirmed booking form
exports.newEvent = catchAsyncError(async(req,res,next)=>{
   const bookingFormId = req.params.id;
   const bookingForm = await BookingForm.findById(bookingFormId);

   if(!bookingForm){
      return res.status(404).json({
         success: false,
         message: 'Booking from not found',
      });
   }

   // Check if booking form is approved
   if (bookingForm.bookingStatus !== 'approved') {
      return res.status(400).json({
          success: false,
          message: "Booking form is not approved, cannot create event",
      });
  }

   const event = await Event.create({
      bookingFormId,
      bookingdetails: bookingForm.bookingdetails,
      contactdetails: bookingForm.contactdetails,
   });

   res.status(201).json({
      success: true,
      event,
  });
});
*/
// createEvent - http://localhost:8000/api/v1/event/new
exports.newEvent = catchAsyncError(async(req,res,next)=>{
   const event= await Event.create(req.body);
  res.status(201).json({
   success: true,
   event
  });

});


//Get Single Event
exports.getSingleEvent = catchAsyncError(async(req, res, next) => {
  const event = await Event.findById(req.params.id);

  if(!event) {
      return next(new ErrorHandler('Event not found', 400));
  }

  res.status(201).json({
      success: true,
      event
  });
});


//updateEvent
exports.updateEvent=catchAsyncError(async(req,res,next)=>{
  let event = await Event.findById(req.params.id);

  if(!event){
     return res.status(404).json({
        success: false,
        message:"Event not found"
     });
  }
  event = await Event.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
  })
  res.status(200).json({
     success: true,
      event
  });
});

//Deleteevent
exports.deleteEvent = catchAsyncError(async(req,res,next)=>{
  const event = await Event.findById(req.params.id);

  if(!event){
     return res.status(404).json({
        success: false,
        message:"Event not found"
     });
  }
  await Event.findByIdAndDelete(req.params.id);
  res.status(200).json({
     success: true,
     message:"Event Deleted"
  });

});

//1:19:04 / 2:26:53