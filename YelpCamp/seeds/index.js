const mongoose = require('mongoose')
const Campground = require('../models/campground') 
const cities = require('./cities')
const {places,descriptors} = require('./seedHelpers')


//---> connect mangoose
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(() => {
    console.log("Mongo - we are connected");
  })
  .catch((err) => {
    console.log("Mongo - Oh No! Error!!!", err);
  });



// get random places and description
const randomTitle = (array)=>{
    return array[Math.floor(Math.random()*array.length)]
}


//---> first we will delete all the campgrounds
const seedDB = async ()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const radomPrice = Math.floor(Math.random()* 51)+50;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            price: `$${radomPrice}`,
            title: `${randomTitle(descriptors)} ${randomTitle(places)}`

        })
        await camp.save()
    }
}


//---> call seedDB and then close db
seedDB().then(()=>{
    mongoose.connection.close();
})
