//MERNAPP/Backend/utils/jwt.js
const sendToken = (user,statusCode, res) =>{
    //create token
    const token = user.getJwtToken();

    // set cookies
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 *1000),
        httpOnly: true,
    }

    res.status(statusCode)
    .cookie('token',token,options)
    .json({
        success: true,
        token, 
        role: user.role,
    });

} ;
module.exports = sendToken;
