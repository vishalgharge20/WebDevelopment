const { name } = require('ejs')
const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    Name:String,
    email: String,
    Age: Number
})


const User = mongoose.model("users",UserSchema)

module.exports = User