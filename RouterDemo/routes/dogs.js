const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    res.send("All Dogs")
})
router.get('/:id',(req,res)=>{
    res.send("Get one Dog")
})
router.get('/new',(req,res)=>{
    res.send("new dog page")
})
router.post('/',(req,res)=>{
    res.send("Create new dog")
})
router.get('/:id/edit',(req,res)=>{
    res.send("edit dog")
})


module.exports = router