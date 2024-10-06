const express = require('express');
const mongoose = require('mongoose')
const app = express();
const ejsMate = require('ejs-mate')
// const path = require('path')
const Campground = require('./models/campground') 
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const joi = require('joi')
const {campgroundschema,reviewSchema} = require('./schemas')
const Review = require('./models/reviews')


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


//// middleware to validate JOI
// //// using joi
const validateCampground = (req,res,next)=>{
  const {error} = campgroundschema.validate(req.body)
  if(error){
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg,400 )
  }
  else{
    next()
  }  
}


const validateReview = (req,res,next)=>{
  const {error} = reviewSchema.validate(req.body)
  if(error){
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg,400 )
  }
  else{
    next()
  }  
}





app.get('/',(req,res)=>{
    res.render('home')
})


//--> get all campgrounds
app.get('/campgrounds',catchAsync(async(req,res)=>{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index',{campgrounds})
}))


///-------> order matters <-----------///
// get new campground page
app.get('/campgrounds/new',catchAsync(async(req,res)=>{
  res.render('campgrounds/newPage')
}))

/// create new campground using page
app.post('/campgrounds/new', validateCampground, catchAsync(async(req,res)=>{
  //// server side validation using if
  // const { title, price, location, description, image } = req.body;
  //   // Check if any required field is missing
  //   if (!title || !price || isNaN(price) || !location || !description || !image) {
  //       throw new ExpressError('All fields must be filled out.', 400);
  //   }

    const newCampground = new Campground(req.body)
    await newCampground.save()
    res.redirect(`/campgrounds/${newCampground.id}`)
}))



//--> get campground by id
app.get('/campgrounds/:id',catchAsync(async(req,res)=>{
  const {id} = req.params;
  // if (!mongoose.isValidObjectId(id)) {
  //   return res.status(400).send('Invalid ID format'); // Return 400 Bad Request
  // }
    const foundCampground = await Campground.findById(id).populate('reviews')
    if(!foundCampground){
      throw new ExpressError('Product Not Found', 404)
  }
    res.render('campgrounds/show',{foundCampground})
}))




///// go to the update page
app.get('/campgrounds/:id/edit',catchAsync(async(req,res)=>{
  const {id} = req.params;
    const foundCampground = await Campground.findById(id)
    if(!foundCampground){
      throw new ExpressError('Product Not Found', 404)
  }
    res.render('campgrounds/edit',{foundCampground})
}))


/// update in update page
app.put('/campgrounds/:id',validateCampground,catchAsync(async(req,res)=>{
  const {id} = req.params;
    const updateCampground = await Campground.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
    if(!updateCampground){
      throw new ExpressError('Product Not Found', 404)
  }
    res.redirect('/campgrounds')
}))



///  delete campground
app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
  const {id} = req.params;
    const deleteCampground = await Campground.findByIdAndDelete(id)
    if(deleteCampground.deletedCount===0){
      throw new AppError('Product Not Found', 404)
  }
    res.redirect('/campgrounds')
}))


//// review routes
// review campground
app.get('/campgrounds/:id/review/new',catchAsync(async(req,res)=>{
  const {id} = req.params;
    const foundCampground = await Campground.findById(id)
    if(!foundCampground){
      throw new ExpressError('Product Not Found', 404)
  }
    res.render('reviews/review',{foundCampground})
}))

app.post('/campgrounds/:id/review',validateReview, catchAsync(async(req,res)=>{
  const {id} = req.params;
  const foundCampground = await Campground.findById(id)
  const newReview = new Review(req.body)
  foundCampground.reviews.push(newReview)
  await newReview.save()
  await foundCampground.save()
  res.redirect(`/campgrounds/${foundCampground.id}`)
}))

/// delete a review
app.delete('/campgrounds/:id/review/:reviewid', catchAsync(async (req, res) => {
  const {id,reviewid} = req.params;
  const foundCampground = await Campground.findByIdAndUpdate(id)
  if(!foundCampground){
    throw new ExpressError('Product Not Found', 404)
  }
  const delReview = await Review.findByIdAndDelete(reviewid)
  console.log(delReview)
  res.redirect(`/campgrounds/${foundCampground.id}`)
}))

 
app.all('*',(req,res,next)=>{
  next(new ExpressError('Page Not Found', 404))
})


// Error handling middleware
app.use((err, req, res, next) => {
  const {statusCode = 500} = err
  if(!err.message){
    err.message = 'Oh No Something went Wrong'
  }
  res.status(statusCode).render('error',{err})
});


app.listen(3000,()=>{
  console.log('Serving on port 3000')
})