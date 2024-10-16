const joi = require('joi')
const { model, models } = require('mongoose')

module.exports.campgroundschema = joi.object({
    title: joi.string().min(3).required(),
    location: joi.string().min(3).required(),
    price: joi.number().integer().min(0).required(),
    // image: joi.string().required(),
    description: joi.string().required(),
    deleteImages:  joi.array()
  })


  module.exports.reviewSchema = joi.object({
    rating: joi.number().min(1).max(5).required(),
    body: joi.string().required()
  })

