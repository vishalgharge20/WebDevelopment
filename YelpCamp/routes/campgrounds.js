const express = require('express')
const router = express.Router()
const Campground = require('../models/campground')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const {isLoggedIn,isAuthor,validateCampground} = require('../middleware')
const campgroundsControllers = require('../controllers/campgrounds')
// require cloudinary storage
const { storage } = require('../cloudinary/index')
// Multer
const multer = require('multer')
const upload = multer({storage})


//--> get all campgrounds
router.get('/',catchAsync(campgroundsControllers.index))



router.get('/search', catchAsync(async (req, res) => {
    const query = req.query.q;
  
    try {
      const foundCampgrounds = await Campground.find({ 
        //Using $or for Broader Search
        $or: [
          { title: { $regex: query, $options: 'i' } }, // Partial and case-insensitive match for title
          { location: { $regex: query, $options: 'i' } } // Partial and case-insensitive match for location
        ]
      });
  
      if (foundCampgrounds.length > 0) {
        res.render('campgrounds/index', { campgrounds: foundCampgrounds });
      } else {
        req.flash('error','Campground Not Found')
        return res.redirect('/campgrounds')
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }));



///-------> order matters <-----------///
// get new campground page
router.get('/new',catchAsync(campgroundsControllers.getNewForm))


// /// create new campground using page
router.post('/new', isLoggedIn,  upload.array('image'), validateCampground, catchAsync(campgroundsControllers.createCampground))


//--> get campground by id
router.get('/:id',catchAsync(campgroundsControllers.getcampgroundById))


///// go to the update page
router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(campgroundsControllers.getUpdatePage))


/// update in update page
router.put('/:id',isLoggedIn,isAuthor,upload.array('image'), validateCampground,catchAsync(campgroundsControllers.updateCampground))


///  delete campground
router.delete('/:id', isLoggedIn,isAuthor,catchAsync(campgroundsControllers.deleteCampground))

module.exports = router