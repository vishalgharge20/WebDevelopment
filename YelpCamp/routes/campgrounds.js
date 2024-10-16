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