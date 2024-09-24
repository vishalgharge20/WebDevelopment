const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Product')
  .then(() => {
    console.log("we are connected");
  })
  .catch((err) => {
    console.log("Oh No! Error!!!", err);
  });


const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number
    }
})

const Product = mongoose.model('Product',productSchema)

const bike = new Product(
    {name:'Mountain Bike', price: 999},
)
bike.save()
    .then(data=>{
        console.log("It Worked")
        console.log(data)
    })
    .catch(err=>{
        console.log("Error!!!")
        console.log(err)
    })


Product.insertMany([
  { name: 'Road Bike', price: 1200 },
  { name: 'Electric Bike', price: 2000 },
  { name: 'Hybrid Bike', price: 850 }
])
  .then(data => {
    console.log("Products inserted successfully:");
    console.log(data);
  })
  .catch(err => {
    console.log("Error inserting products:");
    console.log(err);
  });