const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose') 
const methodOverride = require('method-override');
const session = require('express-session')
const flash = require('connect-flash')

/// flash setup
app.use(session({secret:'mysecret',resave:false,saveUninitialized:false}))
app.use(flash())


// import the model --- Product
const Product = require('./models/product')

mongoose.connect('mongodb://127.0.0.1:27017/CRUD_app_db')
  .then(() => {
    console.log("Mongo - we are connected");
  })
  .catch((err) => {
    console.log("Mongo - Oh No! Error!!!", err);
  });

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

// Use method-override middleware
app.use(methodOverride('_method'));


/// res.locals for flash
app.use((req,res,next)=>{
    res.locals.messages = req.flash('success')
    next()
})


app.listen(3000,()=>{
    console.log("App is listening on port 3000!!")
})

// //// base route
// app.get('/products',async (req,res)=>{
//     const allProducts = await Product.find({})       // find all ---> find({})
//     res.render('products/index.ejs',{allProducts})            /// we have already set views path, it adds ./views+
// })

///////////////////// here we will add query also if we have any query it will show only those products or show all
app.get('/products', async (req, res) => {
    const categories = Product.schema.path('categories').enumValues; // Fetch categories from your database
    let allProducts 
    // Check if categories are provided in the query
    for(c of categories){
        if (req.query.categories===c) {
            allProducts = await Product.find({ categories: c }); // Correctly find products by the selected category
            break;
        }
    }
    // If no valid category was found in the loop, fetch all products
    if (!allProducts) {
        allProducts = await Product.find({});
    }
    // Render the products regardless of filtering
    res.render('products/index.ejs', { allProducts });
});



/// create new product page
app.get('/products/new',async(req,res)=>{
    const categories = Product.schema.path('categories').enumValues   // Fetch categories from your database
    // console.log(categories)
    res.render('products/new.ejs', { categories });
})




/// create new product
app.post('/products/post', async (req, res) => {
    try {
        // Parse the request body
        const body = req.body;

        // Create a new product instance (single product)
        const newProduct = new Product({
            name: body.name,
            price: body.price,
            categories: body.categories
        });

        // Save the new product to the database
        await newProduct.save();

        /// falsh a success message
        req.flash('success','Successfully made a new farm')
        // Redirect to the product's show page with its _id
        res.redirect(`/products/${newProduct._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


/// get products through id
app.get('/products/:id',async (req,res)=>{
    const {id} = req.params
    const foundProduct = await Product.findById(id)
    res.render('products/showProduct.ejs',{foundProduct,})
})


//// create a edit page
app.get('/products/:id/edit',async (req,res)=>{
    const categories = Product.schema.path('categories').enumValues   // Fetch categories from your database
    const {id} = req.params
    const foundProduct = await Product.findById(id)
    res.render('products/edit.ejs',{foundProduct,categories})
})


/// update a product
app.put('/products/:id/edit', async (req, res) => {
    try {
        //console.log(body)
        /// Destructure `id` from request parameters
        const body = req.body;
        const { id } = req.params;

        /// Edit a product instance (single product)
        /////simple option -------- below line
        // const editProduct = await Product.findByIdAndUpdate(id,req.body, {runValidators:true, new:true})

        const editProduct = await Product.updateOne(
            { _id: id },  // Filter: update the product with the given ID
            { 
                name: body.name,
                price: body.price,
                categories: body.categories
            }
        );

        //// or use //////////////
        // Product.findByIdAndUpdate(id,req.body, {runValidators:true, new:true})


        ///  Redirect to the product's show page with its _id
        res.redirect(`/products/${id}`);     
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


//// delete a product
app.delete('/products/:id',async (req,res)=>{
    const {id} = req.params
    const deleteProduct = await Product.deleteOne({_id: id})
    res.redirect('/products')
})


