const Review = require('../models/reviews')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground') 



module.exports.getReviewForm = async(req,res)=>{
    const {id} = req.params;
      const foundCampground = await Campground.findById(id)
      if(!foundCampground){
        throw new ExpressError('Product Not Found', 404)
    }
      res.render('reviews/review',{foundCampground})
  } 



module.exports.postReview = async(req,res)=>{
    const {id} = req.params;
    const foundCampground = await Campground.findById(id)
    const newReview = new Review(req.body)
    newReview.author = req.user._id
    foundCampground.reviews.push(newReview)
    await newReview.save()
    await foundCampground.save()
    req.flash('success','Review Posted')
    res.redirect(`/campgrounds/${foundCampground.id}`)
  }


module.exports.deleteReview = async (req, res) => {
    const {id,reviewid} = req.params;
    const foundCampground = await Campground.findByIdAndUpdate(id)
    if(!foundCampground){
      throw new ExpressError('Product Not Found', 404)
    }
    const delReview = await Review.findByIdAndDelete(reviewid)
    req.flash('success','Review Deleted')
    res.redirect(`/campgrounds/${foundCampground.id}`)
  }