const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose') 
const methodOverride = require('method-override');
const Farm = require('./models/farm')

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

app.listen(3000,()=>{
    console.log("App is listening on port 3000!!")
})


//// routes for farms

app.get('',(req,res)=>{
    res.render('dashboard.ejs')
})

// Create new farm page
app.get('/farms/new', (req, res) => {
    res.render('farms/new.ejs');
});

// Post new farm
app.post('/farms/post', async (req, res) => {
    const body = req.body;
    const newfarm = new Farm(body);
    await newfarm.save();
    res.redirect('/farms');
});

// Get all farms
app.get('/farms', async (req, res) => {
    const allFarms = await Farm.find({});
    res.render('farms/index.ejs', { allFarms });
});

// Get farm by ID
app.get('/farms/:id', async (req, res) => {
    const id  = req.params.id;
    const findfarm = await Farm.findById(id).populate('products');
    res.render('farms/showFarm.ejs', { findfarm});
});



// Delete a farm
app.delete('/farms/:id', async (req, res) => {
    const { id } = req.params;
    await Farm.findOneAndDelete({ _id: id });
    res.redirect('/farms');
});



///// nested routes
// Get the form to add products in farm
app.get('/farms/:id/products/new',(req, res) => {
    const { id } = req.params;
    const categories = Product.schema.path('categories').enumValues; // Fetch categories from your database
    res.render('products/new.ejs', { categories, formAction: `/farms/${id}/products` });
});

/// create product 
app.post('/farms/:id/products',async(req,res)=>{
    const {id} = req.params
    const farm  = await Farm.findById(id)
    const body = req.body
    const newProduct = new Product(body);
    await newProduct.save();
    // console.log(farm)
    ////imp
    farm.products.push(newProduct)
    newProduct.farm = farm
    await farm.save()
    await newProduct.save()
    ///imp
    res.redirect(`/farms/${id}`)    
})





//// routes for Products

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
    res.render('products/new.ejs', { categories, formAction: '/products/post' });
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

        // Redirect to the product's show page with its _id
        res.redirect(`/products/${newProduct._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


/// get products through id
app.get('/products/:id',async (req,res)=>{
    const id = req.params.id;
    const foundProduct = await Product.findById(id).populate('farm')
    res.render('products/showProduct.ejs',{foundProduct})
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


