const express = require('express')
const router = express.Router()
// const router = express.Router({mergeParas:true})
const Review = require('../models/reviews')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const {reviewSchema} = require('../schemas')
const Campground = require('../models/campground') 





//// middleware to validate JOI
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



//// review routes
// review campground
router.get('/campgrounds/:id/review/new',catchAsync(async(req,res)=>{
    const {id} = req.params;
      const foundCampground = await Campground.findById(id)
      if(!foundCampground){
        throw new ExpressError('Product Not Found', 404)
    }
      res.render('reviews/review',{foundCampground})
  }))
  
router.post('/campgrounds/:id/review',validateReview, catchAsync(async(req,res)=>{
    const {id} = req.params;
    const foundCampground = await Campground.findById(id)
    const newReview = new Review(req.body)
    foundCampground.reviews.push(newReview)
    await newReview.save()
    await foundCampground.save()
    req.flash('success','Review Posted')
    res.redirect(`/campgrounds/${foundCampground.id}`)
  }))
  
  /// delete a review
router.delete('/campgrounds/:id/review/:reviewid', catchAsync(async (req, res) => {
    const {id,reviewid} = req.params;
    const foundCampground = await Campground.findByIdAndUpdate(id)
    if(!foundCampground){
      throw new ExpressError('Product Not Found', 404)
    }
    const delReview = await Review.findByIdAndDelete(reviewid)
    req.flash('success','Review Deleted')
    res.redirect(`/campgrounds/${foundCampground.id}`)
  }))


  module.exports = router