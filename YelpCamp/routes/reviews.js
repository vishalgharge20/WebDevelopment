const express = require('express')
const router = express.Router()
// const router = express.Router({mergeParas:true})
const Review = require('../models/reviews')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground') 
const {isLoggedIn,validateReview,isReviewAuthor} = require('../middleware')



//// review routes
// review campground
router.get('/campgrounds/:id/review/new',isLoggedIn,catchAsync(async(req,res)=>{
    const {id} = req.params;
      const foundCampground = await Campground.findById(id)
      if(!foundCampground){
        throw new ExpressError('Product Not Found', 404)
    }
      res.render('reviews/review',{foundCampground})
  }))
  
router.post('/campgrounds/:id/review',isLoggedIn,validateReview, catchAsync(async(req,res)=>{
    const {id} = req.params;
    const foundCampground = await Campground.findById(id)
    const newReview = new Review(req.body)
    newReview.author = req.user._id
    foundCampground.reviews.push(newReview)
    await newReview.save()
    await foundCampground.save()
    req.flash('success','Review Posted')
    res.redirect(`/campgrounds/${foundCampground.id}`)
  }))
  
  /// delete a review
router.delete('/campgrounds/:id/review/:reviewid',isLoggedIn,isReviewAuthor,catchAsync(async (req, res) => {
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