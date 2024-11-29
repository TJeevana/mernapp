//MERNAPP/Backend/controllers/authController.js
const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/usermodel');
const sendEmail = require('../utils/email');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');
const crypto = require('crypto');

//register _  http://localhost:8000/api/v1/register
// Register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password, agentRequested } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Set the user role to 'member' for all registrations
        const userRole = 'member'; 

        // Create the new user (id will be auto-incremented)
        const user = await User.create({
            username,
            email,
            password,
            role: userRole, // Always set to member
            agentRequested, // Set agentRequested based on the registration
        });

        // You can access the auto-generated ID if you want to log it
        console.log('New user registered with ID:', user.id);

        res.status(201).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};



// Admin approves or rejects the agent request
exports.approveAgent = catchAsyncError(async (req, res, next) => {
    const { userId, status } = req.body; // status: 'approved' or 'rejected'

    const user = await User.findById(userId);
    if (!user || user.role !== 'agent') {
        return next(new ErrorHandler('User not found or not an agent', 404));
    }

    user.status = status;
    await user.save();

    // Send email based on approval status
    const message = status === 'approved'
        ? `Congratulations, ${user.username}! Your agent registration has been approved.`
        : `Sorry, ${user.username}. Your agent registration has been rejected.`;
    
    await sendEmail({
        email: user.email,
        subject: `Agent Registration ${status.charAt(0).toUpperCase() + status.slice(1)}`,
        message,
    });

    res.status(200).json({
        success: true,
        message: `Agent ${status.charAt(0).toUpperCase() + status.slice(1)} successfully`,
    });
});


exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400));
    }

   
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

   
    const isPasswordMatched = await user.isValidPassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

   
    const token = user.getJwtToken();
    res.status(200).json({
        success: true,
        token,          
        role: user.role,
        userId: user.id 
    });
});



//logout _ http://localhost:8000/api/v1/logout
exports.logoutUser = (req,res, next)=>{
    res.cookie('token',null, {
        expires: new Date(Date.now()),
        httpOnly: true 
    })
    .status(200)
    .json({
        success: true,
        message: "Logedout Successfully"
    })
}

//forgot password _ http://localhost:8000/api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next)=>{
   const user = await User.findOne({email: req.body.email});

   if(!user){
        return next(new ErrorHandler('User not found with this email' ,404))
   }

   const resetToken = user.getResetToken();
   await user.save({validateBeforeSave: false})

   //create reset url
   const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

   const message =`Your password reset url is as follows \n\n
   ${resetUrl} \n\n If you have not requested this email, then ignore it.`

   try {

        sendEmail({
            email: user.email,
            subject: "Reset Password",
            message
        })
        
        res.status(200).json({
            success: true,
            message: `Email send to ${user.email}`
        })
   } catch (error) {
    
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave: false});
    return next(new ErrorHandler(error.message), 500)
   }
})

//reset password _ http://localhost:8000/api/v1/password/reset/48c6f8f6d12151ed55345a77f8b46cb888f11c90
exports.resetPassword = catchAsyncError(async(req,res,next)=>{
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex'); 
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: {
            $gt : Date.now()
        }
    })
    if(!user){
        return next(new ErrorHandler('Password reset token is in valid or expired'))
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password doesnot match'))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave: false})
    
    sendToken(user, 201, res)
})

//Get UserProfile _ http://localhost:8000/api/v1/myprofile
exports.getUserProfile = catchAsyncError(async (req,res,next)=>{
   const user =await User.findById(req.user.id)
   res.status(200).json({
    success: true,
    user
   })
})

//change password _ http://localhost:8000/api/v1/password/change
exports.changePassword = catchAsyncError(async (req,res,next)=>{
    const user =await User.findById(req.user.id).select('+password');
    
    //old password-check
    if(!await user.isValidPassword(req.body.oldPassword)){
        return next(new ErrorHandler('Old password is incorrect',401));  
    }

    // aasign new password
    user.password = req.body.password;
    await user.save();

    res.status(200).json({
        success: true
       })
 })

 
 //Admin-get all users
exports.getAllUsers = catchAsyncError(async (req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success : true,
        users
    })
})

//Admin-get specific user-http://localhost:8000/api/v1/admin/users/66f5718f69a6fd88fb461287
exports.getUser = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.params.id);
        if(!user){

            return next(new ErrorHandler(`user not found with thi id ${ req.params.id}`))
        }
        res.status(200).json({
            success : true,
            user
        })

    
} )

//Admin-update user-http://localhost:8000/api/v1/admin/users/66f5718f69a6fd88fb461287
exports.updateUser = catchAsyncError(async (req,res,next)=>{
    const newUserData ={
        username: req.body.username,
        email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success : true,
        user
    }) 

})

// admin -delete user-http://localhost:8000/api/v1/admin/users/66fa53c8aac0755643b5c0f8

exports.deleteUser = catchAsyncError(async (req,res,next)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user)
    {
        return next(new ErrorHandler(`user not found with thi id ${ req.params.id}`))
    }
    //await user.remove();
    res.status(200).json({
        success : true
    }) 

    
})


/*
/register _  http://localhost:8000/api/v1/register
exports.registerUser = catchAsyncError(async(req,res,next)=>{
    const {username, email, password,role} = req.body;
    const user = await User.create({
        username,
        email,
        password,
        role
    });

    sendToken(user, 201, res)
})

*/