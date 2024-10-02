const mongoose = require('mongoose')
const Campground = require('../models/campground') 


//---> connect mangoose
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(() => {
    console.log("Mongo - we are connected");
  })
  .catch((err) => {
    console.log("Mongo - Oh No! Error!!!", err);
  });

//---> first we will delete all the campgrounds
const seedDB = async ()=>{
    await Campground.deleteMany({});
    const c = new Campground({
        title:'purple fields',
        price: '1000',
        location: 'mysuru'
    })
    await c.save();
}
//---> call seedDB
seedDB()