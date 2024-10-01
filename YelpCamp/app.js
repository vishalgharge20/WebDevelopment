const express = require('express');
const mongoose = require('mongoose')
const app = express();
// const path = require('path')
const Campground = require('./models/campground') 


//---> connect mangoose
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(() => {
    console.log("Mongo - we are connected");
  })
  .catch((err) => {
    console.log("Mongo - Oh No! Error!!!", err);
  });


app.set('view engine','ejs')
//-->> set this if the views folder is not located in the root of the project <<--//
// app.set('views',path.join(__dirname,'views'))   


app.listen(3000,()=>{
    console.log('Serving on port 3000')
})

app.get('/',(req,res)=>{
    res.render('home')
})

//--> new camp
app.get('/makeCampGround',async(req,res)=>{
    const camp = new Campground({
        title:'Jk Grounds',
        price:'200',
        description:'A Small nice park to play Cricket,BasketBall and for Jogging/Walking',
        location:'Near by Railway Station'
    });
    await camp.save();
    res.send(camp)
})

