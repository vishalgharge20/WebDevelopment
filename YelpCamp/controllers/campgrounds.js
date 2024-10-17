const Campground = require('../models/campground')
const ExpressError = require('../utils/ExpressError')
const {cloudinary} = require('../cloudinary')
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapboxToken = process.env.MAPBOX_TOKEN
const geocoder = mbxGeoCoding({accessToken: mapboxToken})


module.exports.index = async(req,res)=>{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index',{campgrounds})
} 


module.exports.getNewForm = async(req,res)=>{
    res.render('campgrounds/newPage')
  }



module.exports.createCampground = async(req,res)=>{
    //// server side validation using if
    // const { title, price, location, description, image } = req.body;
    //   // Check if any required field is missing
    //   if (!title || !price || isNaN(price) || !location || !description || !image) {
    //       throw new ExpressError('All fields must be filled out.', 400);
    //   }
      const geoData = await geocoder.forwardGeocode({
        query: req.body.location,
        limit: 1
      }).send()
      // console.log(geoData.body.features[0].geometry.coordinates);
      // output --> [ 72.878723, 19.077793 ]
      const newCampground = new Campground(req.body)
      newCampground.geometry = geoData.body.features[0].geometry
      // output --> { type: 'Point', coordinates: [ 72.878723, 19.077793 ] }
      newCampground.images = req.files.map(f=>({url:f.path,filename:f.filename}))
      newCampground.author = req.user._id
      await newCampground.save()
      // console.log(newCampground)
      req.flash('success','Successfully made a new campground')
      res.redirect(`/campgrounds/${newCampground.id}`)
  }

  

module.exports.getcampgroundById = async(req,res)=>{
    const {id} = req.params;
    const foundCampground = await Campground.findById(id).populate('reviews').populate('author').populate({ path: 'reviews', populate: { path: 'author' } })
    if(!foundCampground){
        req.flash('error','Campground not found!!!')
    res.redirect('/campgrounds')
  }
    res.render('campgrounds/show',{foundCampground})
}


module.exports.getUpdatePage = async(req,res)=>{
    const foundCampground = res.locals.foundCampground
    res.render('campgrounds/edit',{foundCampground})
}


module.exports.updateCampground = async(req,res)=>{
    // console.log("Request body:", req.body); // This should log the body

    const {id} = req.params;
    const updateCampground = await Campground.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
    if(!updateCampground){
      throw new ExpressError('Product Not Found', 404)
    }
    const imgs = req.files.map(f=>({url:f.path,filename:f.filename}))
    updateCampground.images.push(...imgs)
    await updateCampground.save()
    if(req.body.deleteImages){
      for(let filename of req.body.deleteImages){
        await cloudinary.uploader.destroy(filename)
      }
      await updateCampground.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}})
    }
    req.flash('success','Successfully Updated campground')
    res.redirect('/campgrounds')
}


module.exports.deleteCampground = async (req, res) => {

    const deleteCampground = await Campground.findByIdAndDelete(id)
    if(deleteCampground.deletedCount===0){
      req.flash('error','Page Not Found')
      return res.redirect('/campgrounds')
    }
      req.flash('success','Successfully Deleted campground')
      res.redirect('/campgrounds')
  }


