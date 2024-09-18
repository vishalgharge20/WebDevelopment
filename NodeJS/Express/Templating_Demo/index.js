const express = require("express")
const app =express()
const path = require("path")
const Reddit_data = require("./data.json")

// app.use(express.static('public'))
// To run when we run from other dir
app.use(express.static(path.join(__dirname,'/public')))


app.set('view engine','ejs') 
// To run when we run from other dir
app.set('views',path.join(__dirname,'/views'))


app.listen(3000,()=>{
    console.log("Listening on Port 3000")
})

// app.get('/',(req,res)=>{
//     res.send("Hi")
// })

/// we will now send home page as response
app.get('/',(req,res)=>{
    res.render('home.ejs')
})

app.get('/rand',(req,res)=>{
    const num = Math.floor(Math.random()*10)+1
    res.render('random.ejs',{rand:num})
})

app.get('/cats',(req,res)=>{
    const cats = ['blue','monty','tom','harry']
    res.render('cats.ejs',{cats})
})

app.get('/r/:subreddit',(req,res)=>{
    const {subreddit} = req.params
    const data = Reddit_data[subreddit]
    if(data){
        res.render('subreddit.ejs',{...data})
    } else{
        res.render('NotFound.ejs',{subreddit})
    }
    
})