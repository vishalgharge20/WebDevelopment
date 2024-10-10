const express = require('express')
const router = express.Router()
const Campground = require('../models/campground')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const {isLoggedIn,isAuthor,validateCampground} = require('../middleware')



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
router.post('/new', isLoggedIn,validateCampground, catchAsync(async(req,res)=>{
  //// server side validation using if
  // const { title, price, location, description, image } = req.body;
  //   // Check if any required field is missing
  //   if (!title || !price || isNaN(price) || !location || !description || !image) {
  //       throw new ExpressError('All fields must be filled out.', 400);
  //   }

    const newCampground = new Campground(req.body)
    newCampground.author = req.user._id
    await newCampground.save()
    req.flash('success','Successfully made a new campground')
    res.redirect(`/campgrounds/${newCampground.id}`)
}))

//--> get campground by id
router.get('/:id',catchAsync(async(req,res)=>{
    const {id} = req.params;
    const foundCampground = await Campground.findById(id).populate('reviews').populate('author').populate({ path: 'reviews', populate: { path: 'author' } })
    if(!foundCampground){
        req.flash('error','Campground not found!!!')
    res.redirect('/campgrounds')
  }
    res.render('campgrounds/show',{foundCampground})
}))



///// go to the update page
router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(async(req,res)=>{
    const foundCampground = res.locals.foundCampground
    res.render('campgrounds/edit',{foundCampground})
}))

/// update in update page
router.put('/:id',isLoggedIn,isAuthor,validateCampground,catchAsync(async(req,res)=>{

    const updateCampground = await Campground.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
    if(!updateCampground){
      throw new ExpressError('Product Not Found', 404)
    }
    req.flash('success','Successfully Updated campground')
    res.redirect('/campgrounds')
}))

///  delete campground
router.delete('/:id', isLoggedIn,isAuthor,catchAsync(async (req, res) => {

  const deleteCampground = await Campground.findByIdAndDelete(id)
  if(deleteCampground.deletedCount===0){
    req.flash('error','Page Not Found')
    return res.redirect('/campgrounds')
  }
    req.flash('success','Successfully Deleted campground')
    res.redirect('/campgrounds')
}))

module.exports = router