const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose') 
const methodOverride = require('method-override');
const AppError = require('./AppError')

// import the model --- Product
const Product = require('./models/product')

mongoose.connect('mongodb://127.0.0.1:27017/farmStand2')
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

app.listen(3000,()=>{
    console.log("App is listening on port 3000!!")
})


///Async Wrap function
function wrapAsync(fn){
    return function(req,res,next){
        fn(req,res,next).catch(error => next(error))
        }
    }



// //// base route
// app.get('/products',async (req,res)=>{
//     const allProducts = await Product.find({})       // find all ---> find({})
//     res.render('products/index.ejs',{allProducts})            /// we have already set views path, it adds ./views+
// })

///////////////////// here we will add query also if we have any query it will show only those products or show all
app.get('/products', wrapAsync( async (req, res,next) => {
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
})
)



/// create new product page
app.get('/products/new', wrapAsync(async(req,res,next)=>{
        const categories = Product.schema.path('categories').enumValues   // Fetch categories from your database
        // console.log(categories)
        res.render('products/new.ejs', { categories });
}))




/// create new product
app.post('/products/post', wrapAsync(async (req, res,next) => {

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

        // Redirect to the product's show page with its _id
        res.redirect(`/products/${newProduct._id}`);
}));


/// get products through id
app.get('/products/:id', wrapAsync(async (req,res,next)=>{
        const {id} = req.params
        const foundProduct = await Product.findById(id)   
        // error handler ---> runs last app.use middleware route
        if(!foundProduct){
            throw new AppError('Product Not Found', 404)
        }
        res.render('products/showProduct.ejs',{foundProduct})
    }
))



//// create a edit page
app.get('/products/:id/edit', wrapAsync(async (req,res,next)=>{
        const categories = Product.schema.path('categories').enumValues   // Fetch categories from your database
        const {id} = req.params
        const foundProduct = await Product.findById(id)
        // error handler ---> runs last app.use middleware route
        if(!foundProduct){
             throw new AppError('Product Not Found', 404)
        }
        res.render('products/edit.ejs',{foundProduct,categories})
}))


/// update a product
app.put('/products/:id/edit', wrapAsync(async (req, res,next) => {
        //console.log(body)
        /// Destructure `id` from request parameters
        const body = req.body;
        const { id } = req.params;

        /// Edit a product instance (single product)
        /////simple option -------- below line
        const editProduct = await Product.findByIdAndUpdate(id,req.body, {runValidators:true, new:true})

        // const editProduct = await Product.updateOne(
        //     { _id: id },  // Filter: update the product with the given ID
        //     { 
        //         name: body.name,
        //         price: body.price,
        //         categories: body.categories
        //     }
        // );

        if(!editProduct){
            throw new AppError('Product Not Found', 404)
        }

        ///  Redirect to the product's show page with its _id
        res.redirect(`/products/${id}`);     
}));


//// delete a product
app.delete('/products/:id', wrapAsync(async (req,res,next)=>{
        const {id} = req.params
        const deleteProduct = await Product.deleteOne({_id: id})
        if(deleteProduct.deletedCount===0){
            throw new AppError('Product Not Found', 404)
        }
        res.redirect('/products')
}))





//// differentaiting mongoose errors //////

// function to handle validation error
const handleValidationError = function(err){
    return new AppError(`Validation Failed... ${err.name}, ${err.message}`, 400)
}

// Function to handle CastError
const handleCastError = function(err) {
    return new AppError(`Invalid ID format: ${err.value}`, 400);
};

// Function to handle DuplicateKeyError
const handleDuplicateKeyError = function(err) {
    return new AppError(`Duplicate key error: ${err.keyValue}`, 400);
};

///////////////-////////////////////--------/////////////-//////////////

// middleware to handle mongoose errors
app.use((err, req, res, next) => {
    // console.log(err.name); // Log the error name for debugging

    if (err.name === 'ValidationError') {
        err = handleValidationError(err);
    } else if (err.name === 'CastError') {
        err = handleCastError(err);
    } else if (err.code === 11000) { // MongoDB duplicate key error code
        err = handleDuplicateKeyError(err);
    }
    
    next(err); // Pass the modified error to the next middleware
});

//// middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;  // Set status to err.status or default to 500
    const message = err.message || 'Something Went Wrong';  // Set message to err.message or default to a generic message
    res.status(status).send(message);  // Send the response with the status and message
});

