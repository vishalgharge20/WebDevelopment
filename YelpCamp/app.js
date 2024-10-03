const express = require('express');
const mongoose = require('mongoose')
const app = express();
const ejsMate = require('ejs-mate')
// const path = require('path')
const Campground = require('./models/campground') 

// override
const methodOverride = require('method-override');
// Middleware to support PUT and DELETE methods
app.use(methodOverride('_method'));


//---> connect mangoose
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(() => {
    console.log("Mongo - we are connected");
  })
  .catch((err) => {
    console.log("Mongo - Oh No! Error!!!", err);
  });

// ejs-mate
app.engine('ejs',ejsMate)

app.set('view engine','ejs')
//-->> set this if the views folder is not located in the root of the project <<--//
// app.set('views',path.join(__dirname,'views'))   

// Middleware to parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON data
app.use(express.json());


app.listen(3000,()=>{
    console.log('Serving on port 3000')
})

app.get('/',(req,res)=>{
    res.render('home')
})


//--> get all campgrounds
app.get('/campgrounds',async(req,res)=>{
  try{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index',{campgrounds})
  }
  catch(error){
      console.error('Error fetching campgrounds:', error);
      res.status(500).send('Internal Server Error');
    }
})


///-------> order matters <-----------///
// get new campground page
app.get('/campgrounds/new',(req,res)=>{
  res.render('campgrounds/newPage')
})

/// create new campground using page
app.post('/campgrounds/new',async(req,res)=>{
  const { title, price, location, description,image } = req.body;
  console.log(req.body)
  try{
    const newCampground = new Campground(req.body)
    await newCampground.save()
    res.redirect('/campgrounds')
  }
  catch(error){
    console.error("ERROR!!",error)
  }
})




//--> get campground by id
app.get('/campgrounds/:id',async(req,res)=>{
  const {id} = req.params;
  // if (!mongoose.isValidObjectId(id)) {
  //   return res.status(400).send('Invalid ID format'); // Return 400 Bad Request
  // }
  try{
    const foundCampground = await Campground.findById(id)
    // if (!foundCampground) {
    //   return res.status(404).send('Campground not found'); // Handle not found case
    // }
    res.render('campgrounds/show',{foundCampground})
  }
  catch(error){
    console.error("Error occurred while fetching campgrounds:",error)
    res.status(500).send('Internal Server Error'); // Inform the client about the error
  }
})




///// go to the update page
app.get('/campgrounds/:id/edit',async(req,res)=>{
  const {id} = req.params;
  try{
    const foundCampground = await Campground.findById(id)
    res.render('campgrounds/edit',{foundCampground})
  }
  catch(error){
    console.error("Error occurred while fetching campgrounds:",error)
  }
})


/// update in update page
app.put('/campgrounds/:id',async(req,res)=>{
  const {id} = req.params;
  try{
    const updateCampground = await Campground.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
    res.redirect('/campgrounds')
  }
  catch(err){
    console.log(err)
  }
})



///  delete campground
app.delete('/campgrounds/:id', async (req, res) => {
  const {id} = req.params;
  try{
    const deleteCampground = await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
  }
  catch(err){
    console.log(err)
  }
})



// //--> new camp
// app.get('/makeCampGround',async(req,res)=>{
//     const camp = new Campground({
//         title:'Jk Grounds',
//         price:'200',
//         description:'A Small nice park to play Cricket,BasketBall and for Jogging/Walking',
//         location:'Near by Railway Station'
//     });
//     await camp.save();
//     res.send(camp)
// })

