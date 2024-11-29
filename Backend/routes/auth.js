//MERNAPP/Backend/routes/auth.js
const express = require('express');
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserProfile, changePassword, getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/authController');
const router = express.Router();
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/authenticate');

router.route('/register').post(registerUser);
router.route('/register/member').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword); 
router.route('/password/reset/:token').post(resetPassword);
router.route('/password/change').put(isAuthenticatedUser,changePassword);
router.route('/myprofile').get(isAuthenticatedUser , getUserProfile);


// Admin
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUsers);
router.route('/admin/users/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getUser);
router.route('/admin/users/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateUser);
router.route('/admin/users/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser);

module.exports = router; 


// 43:41 / 2:26:53