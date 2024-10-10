const express = require('express')
const app = express()
const User = require('./models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')


mongoose.connect('mongodb://127.0.0.1:27017/Auth_Demo')
  .then(() => {
    console.log("Mongo - we are connected");
  })
  .catch((err) => {
    console.log("Mongo - Oh No! Error!!!", err);
  });



app.set('view engine', 'ejs')
app.set('views','views')

//parsing the request body
app.use(express.urlencoded({ extended: true }));

//session
app.use(session({secret:'badsecret',resave:false, saveUninitialized: false, cookie: { secure: false }}))


//check if user is logged in or else redirect him to logim
const requiredLogin = (req,res,next)=>{
    if(!req.session.user_id){
        return res.redirect('/login')
    }
    next()
}

app.get('/home',requiredLogin,(req,res)=>{
    res.render('home.ejs')
})

app.get('/message',requiredLogin,(req,res)=>{
    res.send('This is a sceret message')
})

// secret message should be logged in
app.get('/secret',(req,res)=>{
    if(!req.session.user_id){
        return res.redirect('/login')
    }
    else{
        res.send('This is a sceret message')
    }
})


//get register form
app.get('/register',(req,res)=>{
    res.render('register')
})

// post user
app.post('/register',async(req,res)=>{
    // res.send(req.body)
    const {username,password} = req.body
    // const hash = await bcrypt.hash(password,12)
    // console.log(hash)
    const newUser = new User({username:username,hashedPassword:password})
    await newUser.save()
    console.log(newUser)
    req.session.user_id = newUser.id
    res.render('home.ejs')
})


// get login page
app.get('/login',(req,res)=>{
    res.render('login')
})

// login post
app.post('/login',async(req,res)=>{
    // res.send(req.body)
    const {username,password} = req.body
    const result = await User.findAndValidate(username,password)
    if(result){
        req.session.user_id = finduser.id
        res.render('home.ejs')
    }
    else{
        res.redirect('/login')
    }
    
})


//logout
app.post('/logout', (req, res) => {
    req.session.user_id = null
        res.redirect('/login')
    })



app.listen(3000,()=>{
    console.log("serving from local host 3000")
})