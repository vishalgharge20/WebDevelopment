const express = require('express')
const router = express.Router()



router.get('/shelters',(req,res)=>{
    res.send("All Shelters")
})

router.get('/shelters/:id',(req,res)=>{
    res.send("View One Shelter")
})

router.get('/shelters/new',(req,res)=>{
    res.send("New Shelter Page")
})

router.post('/shelters',(req,res)=>{
    res.send("Add Shelter")
})

router.get('/shelters/:id/edit',(req,res)=>{
    res.send("Edit one Shelter")
})


module.exports = router