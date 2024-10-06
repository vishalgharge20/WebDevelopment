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

  
const productSchema = new Schema({
name: String,
price: Number,
season: {
    type: String,
    enum: ['Spring','Summer','Fall','Winter']
}
})

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{type: Schema.Types.ObjectId, ref:'Product'}]
})

const Product = mongoose.model('Product',productSchema)
const Farm = mongoose.model('Farm',farmSchema)


// Product.insertMany([
//     {name:'WaterMelon',price:3.99,season:'Summer'},
//     {name:'MuskMelon',price:4.99,season:'Winter'},
//     {name:'Lemon',price:1.99,season:'Summer'}
// ])


const makeFarm = async()=>{
    ///making a farm
    const farm = new Farm({
        name: 'Full Belly Farms', city: 'Mysore, Karnataka'
    })

    //finding a product and pushing it to the farm
    const melon = await Product.findOne({name: 'WaterMelon'})
    farm.products.push(melon)
    await farm.save()
    // console.log(farm)
}

// makeFarm()


const addProduct = async ()=>{
    const farm = await Farm.findOne({name: 'Full Belly Farms'})
    const lemon = await Product.findOne({name: 'Lemon'})
    farm.products.push(lemon)
    await farm.save()
    // console.log(farm)
}


// addProduct()


Farm.findOne({name:'Full Belly Farms'})
.populate('products')
.then(farm=>console.log(farm))