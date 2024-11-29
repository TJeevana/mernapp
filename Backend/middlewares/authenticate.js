
//MERNAPP/Backend/middlewares/authenticate.js
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/usermodel');
const catchAsyncError = require('./catchAsyncError');
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next) =>{
    const {token}= req.cookies;

    if(!token){
        return next(new ErrorHandler('Login first to handle this resource', 401));
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET )
    req.user = await User.findById(decoded.id)
    next();
})

exports.authorizeRoles = (...roles) =>{
    return (req, res, next)  =>{
        if(!roles.includes(req.user.role) ){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`,401))
        }
        next();
    }
}
/*
//MERNAPP/Backend/middlewares/authenticate.js
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/usermodel');
const catchAsyncError = require('./catchAsyncError');
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
  
    if (!token) {
      console.error('No token provided');
      return next(new ErrorHandler('Login first to handle this resource', 401));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return next(new ErrorHandler('Invalid token', 401));
    }
  });
  
  exports.authorizeRoles = (...roles) =>{
    return (req, res, next)  =>{
        if(!roles.includes(req.user.role) ){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`,401))
        }
        next();
    }
};

/*
*/