const User = require('../models/user');
const admin = require('firebase-admin');


// Assuming Firebase Admin is initialized
const serviceAccount = require('../firebase-adminsdk.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


module.exports.renderRegisterForm = (req,res)=>{
    res.render('users/register')
} 


module.exports.postRegister = async (req, res) => { 
    const { email, username, password, phone } = req.body;
    const fullPhoneNumber = `+91${phone}`;

    try {
        // Create user in Firebase Auth
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: username,
            phoneNumber: fullPhoneNumber,
        });

        // Redirect to the OTP verification page
        req.flash('success', 'User registered successfully! Please verify your phone number.');
        res.redirect(`/verify-phone?phone=${encodeURIComponent(fullPhoneNumber)}`);
    } catch (e) {
        console.error(e);
        if (e.code === 'auth/email-already-exists') {
            req.flash('error', 'Email already in use.');
        } else {
            req.flash('error', e.message);
        }
        res.redirect('/register');
    }
};


module.exports.renderVerifyPhoneForm = (req, res) => {
    res.render('users/verify-phone', { uid: req.query.uid });
};

module.exports.postVerifyPhone = async (req, res) => {
    const { verificationId, verificationCode } = req.body;

    try {
        const user = await admin.auth().verifyIdToken(verificationCode);

        if (user) {
            req.flash('success', 'Phone number verified successfully!');
            res.redirect('/login');
        }
    } catch (e) {
        req.flash('error', 'Verification failed. Please try again.');
        res.redirect(`/verify-phone?uid=${verificationId}`);
    }
};


// module.exports.postRegister = async (req, res, next) => {
//     try {
//         const { email, username, phone, password } = req.body;

//         // Check if email already exists
//         const existingEmailUser = await User.findOne({ email });
//         if (existingEmailUser) {
//             req.flash('error', 'Email is already in use. Please choose a different one.');
//             return res.redirect('/register');
//         }

//         // Check if phone already exists
//         const existingPhoneUser = await User.findOne({ phone });
//         if (existingPhoneUser) {
//             req.flash('error', 'Phone number is already in use. Please choose a different one.');
//             return res.redirect('/register');
//         }

//         // Register the new user
//         const newUser = new User({ email, username, phone });
//         const registeredUser = await User.register(newUser, password);

//         // Log in the user
//         req.login(registeredUser, function (err) {
//             if (err) {
//                 return next(err);
//             } else {
//                 const redirectUrl = res.locals.returnTo || '/campgrounds';
//                 delete req.session.returnTo; // Clear returnTo after redirecting
//                 req.flash('success', 'Welcome to YelpCamp');
//                 res.redirect(redirectUrl);
//             }
//         });
//     } catch (e) {
//         // Handle other errors
//         req.flash('error', e.message);
//         res.redirect('/register');
//     }
// };

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