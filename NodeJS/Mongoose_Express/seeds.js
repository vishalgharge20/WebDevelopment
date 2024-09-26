const mongoose = require('mongoose')
const Product = require('./models/product')

mongoose.connect('mongodb://127.0.0.1:27017/CRUD_app_db')
  .then(() => {
    console.log("Mongo - we are connected");
  })
  .catch((err) => {
    console.log("Mongo - Oh No! Error!!!", err);
  });



/// creating a new product data

// const p = new Product({
//     name: 'Grape Juice',
//     price: 1.99,
//     categories: 'fruit'
// })
// p.save()
//     .then(p=>{
//         console.log(p)
//     })
//     .catch(err=>{
//         console.log("Error",err)
//     })


/// inserting many products
// Product.insertMany([
//     {name:'Apple juice', price:2.99, categories:'fruit'},
//     {name:'onions', price:1.49, categories:'vegetable'},
//     {name:'egg', price:0.49, categories:'diary'}
// ])
//     .then(data=>{console.log(data)})
//     .catch(err=>{console.log("Error!!!",err)})
