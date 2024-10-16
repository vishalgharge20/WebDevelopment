const express = require('express')
const router = express.Router()
// const router = express.Router({mergeParas:true})
const Review = require('../models/reviews')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground') 
const {isLoggedIn,validateReview,isReviewAuthor} = require('../middleware')
const reviewsControllers = require('../controllers/reviews')


//// review routes
// review campground
router.get('/campgrounds/:id/review/new',isLoggedIn,catchAsync(reviewsControllers.getReviewForm))
  
router.post('/campgrounds/:id/review',isLoggedIn,validateReview, catchAsync(reviewsControllers.postReview))
  
  /// delete a review
router.delete('/campgrounds/:id/review/:reviewid',isLoggedIn,isReviewAuthor,catchAsync(reviewsControllers.deleteReview))


  module.exports = router