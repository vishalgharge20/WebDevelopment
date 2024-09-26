const { model } = require("mongoose");

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type:Number
    },
    mail:{
        type:String,
        required:true,
    },
    phone:{
        type:Number
    },
    image: {
        type: String,
        // required: true,
    },
    created:{
        type: Date,
        required: true,
        default: Date.now
    }
})


const User = mongoose.model('User',userSchema)


// export the model
module.exports = User