const express = require('express')
const app = express()
const path = require('path')
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override')


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')


app.listen(3000,()=>{
    console.log("Listening to 3000")
})


const comments = [
    {
        id: uuid(),
        username: "Todd",
        comment: "lol,that is so funny"
    },
    {
        id: uuid(),
        username: "Bro",
        comment: "This is how Tom Looks!!!"
    },
    {
        id: uuid(),
        username: "Tom",
        comment: "shut the fuck up!"
    },
    {
        id: uuid(),
        username: "sid",
        comment: "lol"
    }
]

/// To read all Comments
app.get('/comments',(req,res)=>{
    res.render('comments/index', { comments: comments })
})

/// to create a new form for creating a comment
app.get('/comments/new',(req,res)=>{
    res.render('comments/new')
})


/// post comment
app.post('/comments',(req,res)=>{
    const {username,comment} = req.body
    comments.push({username,comment,id:uuid()})
    res.redirect('/comments')
})


/// to get a particular comment
app.get('/comments/:id',(req,res)=>{
    const {id} = req.params
    const comment = comments.find(c=> c.id === id)
    res.render('comments/show',{comment})
})


/// to create a form to edit a particular comment
app.get('/comments/:id/edit',(req,res)=>{
    const {id} = req.params
    const comment = comments.find(c=> c.id === id)
    res.render('comments/edit',{comment})
})


/// update a comment
app.patch('/comments/:id',(req,res)=>{
    const {id} = req.params // Get id from URL
    const newCommentText = req.body.comment // Get new comment text from form
    const oldcomment = comments.find(c=> c.id === id) // Find comment by id
    oldcomment.comment = newCommentText // Update the comment
    res.redirect('/comments')  // Redirect back to the comments page
}) 


//// delete a comment
app.delete('/comments/:id/',(req,res)=>{
    const {id} = req.params // Get id from URL
    const Comments = comments.filter(c=> c.id !== id) // Find comment by id and filtet it out
    res.redirect('/comments')  // Redirect back to the comments page
})


