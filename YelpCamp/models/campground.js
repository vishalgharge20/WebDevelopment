const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./reviews')


const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200')
})

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    images:[ImageSchema],
    author: {
        type: Schema.Types.ObjectId, ref:'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId, ref:'Review'
        }
    ]
});


CampgroundSchema.post('findOneAndDelete',async function(doc){
    console.log(doc)
    if(doc){
        await Review.deleteMany({
            _id:{
                $in: doc.reviews
            }
        })
    }
})

const Campground = mongoose.model('Campground', CampgroundSchema);

module.exports = Campground;
