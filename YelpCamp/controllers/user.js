const User = require('../models/user')



module.exports.renderRegisterForm = (req,res)=>{
    res.render('users/register')
} 

module.exports.postRegister = async(req,res)=>{ 
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
}


module.exports.renderLoginForm = (req,res)=>{
    res.render('users/login')
}


module.exports.postLogin = (req,res)=>{
    req.flash('success','Welcome back!')
    const redirectUrl = res.locals.returnTo ||'/campgrounds'
    delete req.session.returnTo; // Clear returnTo after redirecting
    res.redirect(redirectUrl)
}


module.exports.logout = (req,res)=>{
    req.logout(function(err){
        if(err){
            return next(err)
        }
        req.flash('success', 'Logged Out')
        res.redirect('/login')
    })
}