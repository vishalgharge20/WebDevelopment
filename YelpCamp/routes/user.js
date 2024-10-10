const express = require('express')
const router = express.Router()
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const Passport = require('passport')
const {storeReturnTo} = require('../middleware')



// get register form
router.get('/register',(req,res)=>{
    res.render('users/register')
})

// register user (post)
router.post('/register',storeReturnTo,catchAsync(async(req,res)=>{ 
    /// using try catch because eant to flash message if there is a duplicaet user or email
    try{
        const {email,username,password} = req.body
        const newuser = new User({email:email,username:username})
        const registerduser = await User.register(newuser,password)
        registerduser.save()
        // console.log(registerduser)
        // now login user
        req.login(registerduser,function(err){
            if(err){
                return next(err)
            }
            else{
                const redirectUrl = res.locals.returnTo ||'/campgrounds'
                delete req.session.returnTo; // Clear returnTo after redirecting
                req.flash('success','Welcome to YelpCamp')
                res.redirect(redirectUrl)
            }
        })
    }
    catch(e){
        if (e.code === 11000) {
            req.flash('error', 'Email already in use. Please choose a different one.');
        } else {
            req.flash('error', e.message);
        }
        res.redirect('/register');
    }
}))

// get a login form
router.get('/login',(req,res)=>{
    res.render('users/login')
})

//post login detials and verify user
/// use storeReturnTo middleware to save the returnTo value
router.post('/login',storeReturnTo, Passport.authenticate('local',{failureFlash:true,failureRedirect: '/login'}),(req,res)=>{
    req.flash('success','Welcome back!')
    const redirectUrl = res.locals.returnTo ||'/campgrounds'
    delete req.session.returnTo; // Clear returnTo after redirecting
    res.redirect(redirectUrl)
})

router.post('/login', storeReturnTo, Passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login'
}), (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    console.log(`Redirecting to: ${redirectUrl}`); // Debug log
    delete req.session.returnTo; // Clear the session variable after use
    res.redirect(redirectUrl);
});


// logout
router.get('/logout',(req,res)=>{
    req.logout(function(err){
        if(err){
            return next(err)
        }
        req.flash('success', 'Logged Out')
        res.redirect('/login')
    })
})

module.exports = router

