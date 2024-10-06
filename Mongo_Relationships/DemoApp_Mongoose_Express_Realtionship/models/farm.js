const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = require('./product')

const farmSchema = new Schema({
    name:{
        type: String,
        reuired: [true, 'Farm must Have a Name']
    },
    city:{
        type:String
    },
    email:{
        type:String,
        // required: [true, 'Email required']
    },
    products: [
        {
            type: Schema.Types.ObjectId, ref:'Product'
        }
    ]
})


farmSchema.post('findOneAndDelete', async function (farm) {
    if (farm && farm.products.length) {
        // Delete associated products
        await Product.deleteMany({ _id: { $in: farm.products } });
        console.log('Associated products deleted');
    }
});


const Farm = mongoose.model('Farm',farmSchema)
module.exports = Farm