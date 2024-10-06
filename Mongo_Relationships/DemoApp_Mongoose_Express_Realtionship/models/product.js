const mongoose = require('mongoose')
const Schema = mongoose.Schema
///making the schema
const Farm = require('./farm')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: true,
        min: 0
    },
    categories:{
        type:String,
        enum: ['fruit','vegetable','diary','undefined'],
        lowercase: true
    },
    farm:{
        type: Schema.Types.ObjectId, ref: 'Farm'
    }
})

// Compile our model
const Product = mongoose.model('Product',productSchema)

// export the model
module.exports = Product

