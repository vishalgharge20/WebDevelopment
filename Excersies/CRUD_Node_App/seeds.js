const mongoose = require('mongoose')
const User = require('./models/user')

mongoose.connect('mongodb://127.0.0.1:27017/CRUD_app_db')
  .then(() => {
    console.log("Mongo - we are connected");
  })
  .catch((err) => {
    console.log("Mongo - Oh No! Error!!!", err);
  });


/// inserting many products
User.insertMany([
    {name:'Harry', age:22, mail:'harry@gmail.com', phone: 7209687532445},
    {name:'Tom', age:26, mail:'tom@gmail.com',},
    {name:'Jolly', mail:'jolly@gmail.com', phone: 54487532445},
    {name:'King', age:25, mail:'king@gmail.com',},
    {name:'Sid',  mail:'sid@gmail.com', phone: 785687532445}
])
    .then(data=>{console.log(data)})
    .catch(err=>{console.log("Error!!!",err)})
