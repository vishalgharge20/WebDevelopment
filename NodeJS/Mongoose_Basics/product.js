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
        type: Number,
        min:[0,"price must be postive!!"]
    },
    onsale:{
      type: Boolean,
      default: false
    },
    categories:{
      type: [String],
      default: 'bike'
    },
    qty:{
      online:{
        type: Number,
        default:0
      },
      store:{
        type:Number,
        default:0
        }
      },
      size:{
        type:String,
        enum:['S','M','L']
      }
})

let allProductSaleStatus = false

/// our methods
productSchema.methods.greet = function(){
  console.log(`hello!!!! - from ${this.name}`)
}

productSchema.methods.putOnSale = function(){
  this.onsale = !this.onsale
  this.save()
}

productSchema.methods.putAllOnSale = function(){
  this.onsale = true
  this.price = this.price * 0.8
  return this.save()
}

productSchema.methods.normalPrice = function(){
  if(allProductSaleStatus === true){
    this.onsale = false
    this.price = this.price/0.8
    return this.save()
  }
}

/////////////////////// or //////////////////////////////////////

productSchema.statics.onFireSale = async function(){
  const result = await this.updateMany({},{onsale:true, $mul:{ price:0.8}})
  console.log(result)
  return result
}

productSchema.statics.normalSale = async function(){
  const result = await this.updateMany({},{onsale:false, $mul:{ price:1/0.8}})
  console.log(result)
  return result
}


const Product = mongoose.model('Product',productSchema)


// const findProduct = async ()=>{
//   const foundProduct = await Product.findOne({name:'Road Bike'})
//   foundProduct.greet()
// }

// const findProduct = async ()=>{
//   const foundProduct = await Product.findOne({name:'Road Bike'})
//   console.log(foundProduct)
//   await foundProduct.putOnSale()
//   console.log(foundProduct)
// }
// // findProduct()



///// Set OnSale pricing
let AllProductSale = async ()=>{
  allProductSaleStatus = false
  let allProducts = await Product.find({})
  console.log(allProducts)
  for (let product of allProducts) {
    await product.putAllOnSale(); // Call method on each product
  }
  const updatedProducts = await Product.find({});
  console.log(updatedProducts);
  allProductSaleStatus = true;
}
// AllProductSale()

/////////////////////////////////////////////// easy way ////////////////////////////////////////
// Product.onFireSale().then(res =>{
//   console.log('Added on Sale successfully');
// }).catch(err => {
//   console.error('Error:', err);
// });



///// Set normal pricing
let NormalPrice = async ()=>{
  allProductSaleStatus = true
  let allProducts = await Product.find({})
  console.log(allProducts)
  for (let product of allProducts) {
    await product.normalPrice(); // Call method on each product
  }
  const updatedProducts = await Product.find({});
  console.log(updatedProducts);
  allProductSaleStatus = false
}
// NormalPrice()

/////////////////////////////////////////////// easy way ////////////////////////////////////////
Product.normalSale().then(() => {
  console.log('Sale reverted successfully');
}).catch(err => {
  console.error('Error:', err);
});





// const data = new Product(
//     {name:'Sports T-shirt', price: 49.99,onsale:true,categories:['cycling'], qty:{online:10,store:20}, size:'S'},
// )
// data.save()
//     .then(data=>{
//         console.log("It Worked")
//         console.log(data)
//     })
//     .catch(err=>{
//         console.log("Error!!!")
//         console.log(err)
//     })


// Product.insertMany([
//   { name: 'Road Bike', price: 1200,qty:{online:12,store:1} },
//   { name: 'Electric Bike', price: 2000, qty:{online:5,store:8}},
//   { name: 'Hybrid Bike', price: 850, qty:{online:2,store:6}}
// ])
//   .then(data => {
//     console.log("Products inserted successfully:");
//     console.log(data);
//   })
//   .catch(err => {
//     console.log("Error inserting products:");
//     console.log(err);
//   });



// Product.findOneAndUpdate({name:'Air Pump'},{price:-9},{new:true,runValidators:true})
//     .then(data=>{
//         console.log("It Worked")
//         console.log(data)
//     })
//     .catch(err=>{
//         console.log("Error!!!")
//         console.log(err)
//     })
