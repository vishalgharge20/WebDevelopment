const { type } = require('express/lib/response');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//---> connect mangoose
mongoose.connect('mongodb://127.0.0.1:27017/MongoRelationshipDemo')
  .then(() => {
    console.log("Mongo - we are connected");
  })
  .catch((err) => {
    console.log("Mongo - Oh No! Error!!!", err);
  });

  
const userDetailSchema = new Schema({
    username: String,
    age: Number,
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {type:Schema.Types.ObjectId, ref:'UserDetail'}
})



const UserDetail = mongoose.model('UserDetail',userDetailSchema)
const Tweet = mongoose.model('Tweet',tweetSchema)



// UserDetail.insertMany([
//     {username:'vishal',age:24},
//     {username:'rahul',age:28},
//     {username:'sam',age:18},
//     {username:'luv',age:28},
// ])


const makeTweet = async () => {
    const u = new UserDetail({ 
        username: 'kush', 
        age: 21 });
    const t = new Tweet({ text: 'omg i love chicken burger', likes: 5 });
    t.user = u._id;
    await u.save();
    await t.save();
  
    const rt1 = new Tweet({ text: 'but i love paneer burger', likes: 15 });
    const userfound = await UserDetail.findOne({ username: 'vishal' });
    if(userfound){
        rt1.user = userfound._id
    }
    await rt1.save();
  };

// makeTweet()

const findTweet = async()=>{
    const tweets = await Tweet.find({}).populate('user','username')
    console.log(tweets)
}


findTweet()