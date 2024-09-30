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
    {name:'Harry', age:22, mail:'harry@gmail.com', phone: 7209687532445, image:'https://cdn-icons-png.flaticon.com/512/5231/5231020.png'},
    {name:'Tom', age:26, mail:'tom@gmail.com',image:'https://cdn-icons-png.flaticon.com/512/3001/3001764.png'},
    {name:'Jolly', mail:'jolly@gmail.com', phone: 54487532445,image:'https://cdn-icons-png.flaticon.com/512/4202/4202841.png'},
    {name:'King', age:25, mail:'king@gmail.com',image:'https://cdn-icons-png.flaticon.com/512/4202/4202835.png'},
    {name:'Sid',  mail:'sid@gmail.com', phone: 785687532445,image:'https://cdn-icons-png.flaticon.com/512/4202/4202843.png'}
])
    .then(data=>{console.log(data)})
    .catch(err=>{console.log("Error!!!",err)})
