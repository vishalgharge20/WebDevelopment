const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

// add secret if you want to use signed cookie
app.use(cookieParser('thisismysecret'))


app.get('/greet',(req,res)=>{
    // console.log(req.cookies)
    const {name,age=30,city='mysore'} = req.cookies
    res.send(`Hey There ${name}, your age is ${age} and your city is ${city}`)
})

///signed cookie
app.get('/getsignedcookie',(req,res)=>{
    res.cookie('fruit','grape',{signed:true})
    res.send('signed cookie sent')
})

// verify signed cookie
app.get('/verifyfruit',(req,res)=>{
    console.log(req.cookies)
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})

app.get('/setname',(req,res)=>{
    res.cookie('name','vishal')
    res.send('ok cookie sent')
})

app.listen(3000,()=>{
    console.log("Serving from localhost 3000")
})

