const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, 'Username can not be blank'],    
    },
    hashedPassword:{
        type:String,
        required: [true, 'Username can not be blank'],    
    }
})


userSchema.statics.findAndValidate = async function(username,password) {
   const finduser = await this.findOne({username})
   const isValid = await bcrypt.compare(password,finduser.hashedPassword)
   if(isValid){
    return finduser
   }
   else{
    return false
   }
}


/// middleware for presave before regsitering a user
userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified
    if (this.isModified('hashedPassword')) {
        this.hashedPassword = await bcrypt.hash(this.hashedPassword, 12);
    }
    next();
});


const User = mongoose.model('User',userSchema)

module.exports = User