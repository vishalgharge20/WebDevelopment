/// imports
require('dotenv').config;
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');


// import the model --- Product
// const User = require('./models/product')

mongoose.connect('mongodb://127.0.0.1:27017/CRUD_app_db')
  .then(() => {
    console.log("Mongo - we are connected");
  })
  .catch((err) => {
    console.log("Mongo - Oh No! Error!!!", err);
  });

const app = express();
const PORT = process.env.PORT || 4000;


app.get('/',(req,res)=>{
    res.send("Working")
})

app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})