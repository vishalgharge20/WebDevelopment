const express = require('express')
const router = express.Router()
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const Passport = require('passport')
const {storeReturnTo} = require('../middleware')
const userControllers = require('../controllers/user')




// Route for verifying phone
router.get('/verify-phone', userControllers.renderVerifyPhoneForm);
router.post('/verify-phone', catchAsync(userControllers.postVerifyPhone));




// get register form
router.get('/register',userControllers.renderRegisterForm)


// register user (post)
router.post('/register',storeReturnTo,catchAsync(userControllers.postRegister))


// get a login form
router.get('/login',userControllers.renderLoginForm)


//post login detials and verify user
/// use storeReturnTo middleware to save the returnTo value
router.post('/login',storeReturnTo, Passport.authenticate('local',{failureFlash:true,failureRedirect: '/login'}),userControllers.postLogin)


// logout
router.get('/logout',userControllers.logout)

module.exports = router

