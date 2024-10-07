const express = require('express');
const mongoose = require('mongoose')
const app = express();
const ejsMate = require('ejs-mate')
const path = require('path')
const Campground = require('./models/campground') 
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const joi = require('joi')
const {campgroundschema,reviewSchema} = require('./schemas')
const Review = require('./models/reviews')
const session = require('express-session')
const flash = require('connect-flash')

const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')


// override
const methodOverride = require('method-override');
// Middleware to support PUT and DELETE methods
app.use(methodOverride('_method'));

// app.use(express.static('public'))
// or
app.use(express.static(path.join(__dirname,'public')))

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


// session
const sessionConfig ={
  secret: 'thisisasecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expries: Date.now() + 1000*60*60*24*7,
    maxAge: 1000*60*60*24*7
  }
}
app.use(session(sessionConfig))

//fash
app.use(flash())

/// middleware  for flash
app.use((req,res,next)=>{
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  next()
})




app.use('/campgrounds',campgroundRoutes)
app.use('/',reviewRoutes)


app.get('/',(req,res)=>{
    res.render('home')
})

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