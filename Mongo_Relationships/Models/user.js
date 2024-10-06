const mongoose = require('mongoose')

//---> connect mangoose
mongoose.connect('mongodb://127.0.0.1:27017/MongoRelationshipDemo')
  .then(() => {
    console.log("Mongo - we are connected");
  })
  .catch((err) => {
    console.log("Mongo - Oh No! Error!!!", err);
  });

  
  const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            city: String,
            state: String,
            country: {
                type:String,
                required: true
            }
        }
    ]
  })

  const User = mongoose.model('User',userSchema)


  const makeUser = async()=>{
    const u = new User({
        first: 'Vishal',
        last: 'Gharge',
        addresses: {city:'Mysore',state:'Karnataka',country:'India'}
    })
    await u.save()
    console.log(u)
  }


  const addAddress = async(id)=>{
    const user = await User.findById(id)
    user.addresses.push({
        city:'Karad',state:'Maharastra',country:'India'
    })
    await user.save()
    console.log(user)
  }



//makeUser()
// addAddress('6700e0f7af0849fb8675ed5e')