// //BookingFormController.js
// const BookingForm = require('../models/bookingFormmodel');
// const Event = require('../models/eventmodel');
// const catchAsyncError = require('../middlewares/catchAsyncError');

// // GetBookingForm - http://localhost:8000/api/v1/bookingform
// exports.getbookingforms = catchAsyncError(async (req, res, next) => {
//     const bookingform = await BookingForm.find();
//     res.status(200).json({
//         success: true,
//         bookingform
//     });
// });

// // CreateBookingForm - 
// exports.newBookingForm = catchAsyncError(async (req, res, next) => {
//     const bookingform = await BookingForm.create(req.body);
//     res.status(201).json({
//         success: true,
//         bookingform
//     });
// });

// // UpdateBookingForm - 
// exports.updateBookingForm = catchAsyncError(async (req, res, next) => {
//     let bookingform = await BookingForm.findById(req.params.id);

//     if (!bookingform) {
//         return res.status(404).json({
//             success: false,
//             message: "BookingForm not found"
//         });
//     }
//     bookingform = await BookingForm.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     });
//     res.status(200).json({
//         success: true,
//         bookingform
//     });
// });

// // DeleteBookingForm - 
// exports.deletebookingform = catchAsyncError(async (req, res, next) => {
//     const bookingform = await BookingForm.findById(req.params.id);

//     if (!bookingform) {
//         return res.status(404).json({
//             success: false,
//             message: "BookingForm not found"
//         });
//     }
//     await BookingForm.findByIdAndDelete(req.params.id);
//     res.status(200).json({
//         success: true,
//         message: "BookingForm Deleted"
//     });
// });
// /*
// // ApproveBookingForm - New function to confirm the booking and create an event
// exports.approveBookingForm = catchAsyncError(async (req, res, next) => {
//     const bookingform = await BookingForm.findById(req.params.id);

//     if (!bookingform) {
//         return res.status(404).json({
//             success: false,
//             message: "BookingForm not found"
//         });
//     }

//     // Optionally, add logic to ensure only admins can approve bookings
//     // if (req.user.role !== 'admin') {
//     //     return res.status(403).json({
//     //         success: false,
//     //         message: "Only admins can approve bookings"
//     //     });
//     // }


//     // Update the booking status to approved
//     bookingform.bookingStatus = 'approved';
//     await bookingform.save();

//     // Create an event from the booking form details
//     const eventData = {
//         eventType: bookingform.bookingdetails.eventtype,
//         hallName: bookingform.bookingdetails.hallname,
//         date: bookingform.bookingdetails.date,
//         timeFrom: bookingform.bookingdetails.timefrom,
//         timeTo: bookingform.bookingdetails.timeto,
//         noOfGuests: bookingform.bookingdetails.noofguest,
//         user: bookingform.user, // link the event to the user who booked
//     };

//     const event = await Event.create(eventData);

//     res.status(200).json({
//         success: true,
//         message: "Booking approved and event created successfully",
//         event
//     });
// });
// // Reject booking form
// exports.rejectBookingForm = catchAsyncError(async (req, res, next) => {
//     let bookingform = await BookingForm.findById(req.params.id);

//     if (!bookingform) {
//         return res.status(404).json({
//             success: false,
//             message: "BookingForm not found",
//         });
//     }

//     // Update the booking status to rejected
//     bookingform.bookingStatus = 'rejected';
//     await bookingform.save();

//     res.status(200).json({
//         success: true,
//         message: "Booking rejected successfully",
//     });

// });
// */












// /*
// const BookingForm = require('../models/bookingFormmodel');
// //const ErrorHandler = require('../utils/errorHandler');
// const catchAsyncError = require('../middlewares/catchAsyncError');

// //GetBookingForm - http://localhost:8000/api/v1/bookingform
// exports.getbookingforms = catchAsyncError(async(req,res,next)=>{
  
//   req.body.user = req.user.id;
//    const bookingform=await BookingForm.find();
//    res.status(200).json({
//        success : true,
//        bookingform
//    });
// });

// // createBookingForm - 
// exports.newBookingForm = catchAsyncError(async(req,res,next)=>{
//   const bookingform= await BookingForm.create(req.body);
//   res.status(201).json({
//    success: true,
//    bookingform
//   });

// });


// //updateBookingForm- 
// exports.updateBookingForm=catchAsyncError(async(req,res,next)=>{
//   let bookingform = await BookingForm.findById(req.params.id);

//   if(!bookingform){
//      return res.status(404).json({
//         success: false,
//         message:"BookingForm not found"
//      });
//   }
//   bookingform = await BookingForm.findByIdAndUpdate(req.params.id, req.body,{
//         new: true,
//         runValidators: true
//   })
//   res.status(200).json({
//      success: true,
//       bookingform
//   });
// });


// //DeleteBookingForm-
// exports.deletebookingform = catchAsyncError(async(req,res,next)=>{
//   const bookingform = await BookingForm.findById(req.params.id);

//   if(!bookingform){
//      return res.status(404).json({
//         success: false,
//         message:"BookingForm not found"
//      });
//   }
//   await BookingForm.findByIdAndDelete(req.params.id);
//   res.status(200).json({
//      success: true,
//      message:"BookingForm Deleted"
//   });

// });
//  */