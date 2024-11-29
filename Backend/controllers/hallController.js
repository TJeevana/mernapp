 //backend/controllers/hallControllers.js
 const Hall = require('../models/hallmodel');
 const ErrorHandler = require('../utils/errorHandler');
 const catchAsyncError = require('../middlewares/catchAsyncError');
const { isAuthenticatedUser } = require('../middlewares/authenticate');

 //GetHall - http://localhost:8000/api/v1/hall
 exports.gethalls = catchAsyncError(async(req,res,next)=>{
   const halls=await Hall.find();
    res.status(200).json({
        success : true,
        halls
    });
 });
 
 // createHall - http://localhost:8000/api/v1/hall/new
 exports.newHall = catchAsyncError(async(req,res,next)=>{
   const hall= await Hall.create(req.body);
   res.status(201).json({
    success: true,
    hall
   });

});


//Get Single Hall - http://localhost:8000/api/v1/hall/66ee4181d6d5e4ac2d242bbf
exports.getSingleHall = catchAsyncError(async(req, res, next) => {
   const hall = await Hall.findById(req.params.id);

   if(!hall) {
       return next(new ErrorHandler('Hall not found', 404));
   }

   res.status(200).json({
       success: true,
       hall
   });
});



//updateHall-http://localhost:8000/api/v1/hall/66ebd9ff050864a387d0d454/
exports.updateHall= catchAsyncError(async(req,res,next)=>{
   let hall = await Hall.findById(req.params.id);

   if(!hall){
      return res.status(404).json({
         success: false,
         message:"Hall not found"
      });
   }
   hall = await Hall.findByIdAndUpdate(req.params.id, req.body,{
         new: true,
         runValidators: true
   })
   res.status(200).json({
      success: true,
       hall
   });
});

//Deletehall-http://localhost:8000/api/v1/hall/66ebd9ff050864a387d0d454/
exports.deleteHall = catchAsyncError(async(req,res,next)=>{
   const hall = await Hall.findById(req.params.id);

   if(!hall){
      return res.status(404).json({
         success: false,
         message:"Hall not found"
      });
   }
   await Hall.findByIdAndDelete(req.params.id);
   res.status(200).json({
      success: true,
      message:"Hall Deleted"
   });

});
/*
//create review-
exports.createReview = catchAsyncError(async(req,res,next)=>{

   const {hallid,rating,comment} = req.body;

   const hall= await Hall.findById(hallid);

   if (!hall) {
      return next(new ErrorHandler('Hall not found', 404)); // Return 404 if hall is not found
   }
   const review ={
      user: req.user.id,
      rating: Number(rating),
      comment 
   } 

   
   //find already user reviewed or not
   const isReviewed = hall.reviews.find(review =>{
      return review.user.toString() == req.user.id.toString()
   })

   if(isReviewed){
      //update review
      hall.reviews.forEach((review) => {
         if(review.user.toString() === req.user.id.toString()){
            review.comment = comment
            review.rating = rating
         }
         
      });

   }else{
      //create review
      hall.reviews.push(review);
      hall.numOfReviews = hall.reviews.length;
   }
//aveageof rating
   hall.ratings = hall.reviews.reduce((acc,review) => {
      return review.rating + acc;
   },0)/hall.reviews.length;
   hall.ratings = isNaN(hall.rating)?0:hall.ratings;

   await hall.save({validateBeforeSave: false});

   res.status(200).json({
      success: true
   });

});
*/
exports.createReview = catchAsyncError(async (req, res, next) => {
   const { hallid, rating, comment } = req.body;

   const hall = await Hall.findById(hallid);

   if (!hall) {
       return next(new ErrorHandler('Hall not found', 404));
   }

   const review = {
       user: req.user.id,
       rating: Number(rating),  // Ensure rating is treated as a number
       comment
   };

   // Check if user has already reviewed this hall
   const isReviewed = hall.reviews.find(
       (r) => r.user.toString() === req.user.id.toString()
   );

   if (isReviewed) {
       // Update the existing review
       hall.reviews.forEach((rev) => {
           if (rev.user.toString() === req.user.id.toString()) {
               rev.comment = comment;
               rev.rating = rating;
           }
       });
   } else {
       // Add new review
       hall.reviews.push(review);
       hall.numOfReviews = hall.reviews.length;
   }

   // Calculate average rating
   hall.ratings =
       hall.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
       hall.reviews.length;

   await hall.save({ validateBeforeSave: false });

   res.status(200).json({
       success: true,
       reviews: hall.reviews
   });
});

/*
//Get Reviews - api/v1/reviews?id={hallId}
exports.getReviews = catchAsyncError(async (req, res, next) =>{
   const hall = await Hall.findById(req.query.id).populate('reviews.user','name email');

   res.status(200).json({
       success: true,
       reviews: hall.reviews
   });
});
*/
/*
//Delete Review - api/v1/review
exports.deleteReview = catchAsyncError(async (req, res, next) =>{
   const hall = await Hall.findById(req.query.hallId);
   
   //filtering the reviews which does match the deleting review id
   const reviews = hall.reviews.filter(review => {
      return review._id.toString() !== req.query.id.toString()
   });
   //number of reviews 
   const numOfReviews = reviews.length;

   //finding the average with the filtered reviews
   let ratings = reviews.reduce((acc, review) => {
       return review.rating + acc;
   }, 0) / reviews.length;
   ratings = isNaN(ratings)?0:ratings;

   //save the hall document
   await Hall.findByIdAndUpdate(req.query.hallId, {
       reviews,
       numOfReviews,
       ratings
   })
   res.status(200).json({
       success: true
   })


});
*/
