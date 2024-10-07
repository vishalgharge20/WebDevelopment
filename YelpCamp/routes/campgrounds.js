const express = require('express')
const router = express.Router()
const Campground = require('../models/campground')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const {campgroundschema} = require('../schemas')


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



//--> get all campgrounds
router.get('/',catchAsync(async(req,res)=>{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index',{campgrounds})
}))

///-------> order matters <-----------///
// get new campground page
router.get('/new',catchAsync(async(req,res)=>{
  res.render('campgrounds/newPage')
}))

/// create new campground using page
router.post('/new', validateCampground, catchAsync(async(req,res)=>{
  //// server side validation using if
  // const { title, price, location, description, image } = req.body;
  //   // Check if any required field is missing
  //   if (!title || !price || isNaN(price) || !location || !description || !image) {
  //       throw new ExpressError('All fields must be filled out.', 400);
  //   }

    const newCampground = new Campground(req.body)
    await newCampground.save()
    req.flash('success','Successfully made a new campground')
    res.redirect(`/campgrounds/${newCampground.id}`)
}))

//--> get campground by id
router.get('/:id',catchAsync(async(req,res)=>{
    const {id} = req.params;
    const foundCampground = await Campground.findById(id).populate('reviews')
    if(!foundCampground){
        req.flash('error','Campground not found!!!')
    //   throw new ExpressError('Product Not Found', 404)
    res.redirect('/campgrounds')
  }
    res.render('campgrounds/show',{foundCampground})
}))

///// go to the update page
router.get('/:id/edit',catchAsync(async(req,res)=>{
  const {id} = req.params;
    const foundCampground = await Campground.findById(id)
    if(!foundCampground){
      throw new ExpressError('Product Not Found', 404)
  }
    res.render('campgrounds/edit',{foundCampground})
}))

/// update in update page
router.put('/:id',validateCampground,catchAsync(async(req,res)=>{
  const {id} = req.params;
    const updateCampground = await Campground.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
    if(!updateCampground){
      throw new ExpressError('Product Not Found', 404)
  }
    req.flash('success','Successfully Updated campground')
    res.redirect('/campgrounds')
}))

///  delete campground
router.delete('/:id', catchAsync(async (req, res) => {
  const {id} = req.params;
    const deleteCampground = await Campground.findByIdAndDelete(id)
    if(deleteCampground.deletedCount===0){
      throw new AppError('Product Not Found', 404)
  }
    req.flash('success','Successfully Deleted campground')
    res.redirect('/campgrounds')
}))

module.exports = router