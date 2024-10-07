const express = require('express')
const app = express()


const session = require('express-session')

// pass the secret
// app.use(session({secret: 'thisisasecret'}))

/// pass this secret to remove all deprecitaion warnings
app.use(session({secret: 'thisisasecret', resave:false, saveUninitialized:false}))

/// track view count
app.get('/viewcount',(req,res)=>{
    if(req.session.count){
        req.session.count += 1 
    }
    else{
        req.session.count = 1
    }
    res.send(`you have viewed this page ${req.session.count} times`)
})

//// register user
app.get('/register',(req,res)=>{
    const {username = "Anonymous"} = req.query
    req.session.username = username
    res.redirect('/greet')
})

// greet user
app.get('/greet',(req,res)=>{
    const {username} = req.session
    res.send(`Welcome Back, ${username}`)
})


app.listen(3000,()=>{
    console.log("Serving on port 3000")
})