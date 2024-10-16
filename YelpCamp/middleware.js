const ExpressError = require('./utils/ExpressError')
const Campground = require('./models/campground') 
const {campgroundschema,reviewSchema} = require('./schemas')
const Review = require('./models/reviews')





module.exports.storeReturnTo = (req,res,next)=>{
    if(req.session.returnTo){
        res.locals.returnTo = req.session.returnTo
    }
    next()
}


module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        /// store the url to return to the original url
        req.session.returnTo = req.originalUrl
        req.flash('error','You must be logged in to do that!')
        return res.redirect('/login')
    }
    next()
}


//// middleware to validate JOI
// //// using joi
module.exports.validateCampground = (req,res,next)=>{
    const {error} = campgroundschema.validate(req.body)
    if(error){
      const msg = error.details.map(el => el.message).join(',')
      req.flash('error', msg);
      return res.redirect('back');
    }
    else{
      next()
    }  
  }


  /// middleware for  isAuthor (permissions)
module.exports.isAuthor = async(req,res,next)=>{
    const {id} = req.params;
    const foundCampground = await Campground.findById(id)
    if(!foundCampground){
      req.flash('error','Page Not Found')
      return res.redirect('/campgrounds')
    }
    if(!foundCampground.author.equals(req.user._id)){
      req.flash('error','You do not have permissions to do that')
      return res.redirect(`/campgrounds/${id}`)
    }
    // Pass the campground to the next middleware/route handler
    res.locals.foundCampground = foundCampground;
    next();
}

  /// middleware for  isReviewAuthor (permissions)
  module.exports.isReviewAuthor = async(req,res,next)=>{
    const {id,reviewid} = req.params;
    const review = await Review.findById(reviewid)
    if(!review.author.equals(req.user._id)){
      req.flash('error','You do not have permissions to do that')
      return res.redirect(`/campgrounds/${id}`)
    }
    next();
}

//// middleware to validate JOI
module.exports.validateReview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.body)
    if(error){
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg,400 )
    }
    else{
      next()
    }  
  }