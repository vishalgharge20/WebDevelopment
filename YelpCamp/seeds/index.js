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
            price: radomPrice,
            title: `${randomTitle(descriptors)} ${randomTitle(places)}`,
            image: `https://picsum.photos/600/400?random=${Math.random()}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas voluptatibus cum corporis. Perferendis laudantium ipsum, sit minus placeat natus commodi asperiores sapiente nihil possimus laboriosam deleniti modi minima voluptas necessitatibs Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga perspiciatis praesentium voluptatem nemo debitis nihil in obcaecati accusantium minus veritatis, dolorum, quia repellendus eius explicabo ex saepe voluptas vero tempora."
        })
        await camp.save()
    }
}


//---> call seedDB and then close db
seedDB().then(()=>{
    mongoose.connection.close();
})
