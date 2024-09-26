const mongoose = require('mongoose')

///making the schema


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
    }
})

// Compile our model
const Product = mongoose.model('Product',productSchema)

// export the model
module.exports = Product

