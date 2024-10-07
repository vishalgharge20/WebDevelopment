const express = require('express');
const router = express.Router();


///middle ware to isAdmin
router.use((req,res,next)=>{
    if(req.query.isAdmin){
        next()
    }
    res.send("Sorry you are not an admin")
})


router.get('/topsecret', (req, res) => {
    res.send("This is a Top Secret!!!!");
});

router.get('/delete', (req, res) => {
    res.send("EVERYTHING DELETED");
});

module.exports = router;