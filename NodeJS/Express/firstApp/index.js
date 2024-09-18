
const express = require("express")
const app = express()

// // basic use method to get response
// app.use((request,result)=>{
//     console.log("We got a new Request!!!")
//     result.send("We got your request, this is the response")
//     // result.send({color:"red"})
// })

app.listen(3000,()=>{
    console.log("listening on port 3000")
})

//// query request

app.get('/search',(req,res)=>{
    const {q} = req.query
    res.send(`Hi this is the result for the Query!! ${q}`)
})


// get method

// default response
app.get('/',(request,result)=>{
    result.send("default")
})

//// Path Parameters
app.get('/r/:subreddit',(req,res)=>{
    const {subreddit} = req.params
    res.send(`This is a ${subreddit} subreddit!`)
})

app.get('/r/:subreddit/:postId',(req,res)=>{
    const {subreddit, postId} = req.params
    res.send(`This is a ${subreddit} subreddit and you are viewing the post with postId: ${postId}`)
})


app.get('/dogs',(request,result)=>{
    result.send("Woof Woof!!")
})
app.get('/cats',(request,result)=>{
    result.send("Meow Meow!!")
})


// default response
//or 
//// Always keep this at last (*)
// app.get('*',(request,result)=>{
//     result.send("i dont know that path")
// })


//post request
app.post('/cats',(request,result)=>{
    result.send("This is a post request")
})




