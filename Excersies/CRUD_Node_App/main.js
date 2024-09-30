/// imports
require('dotenv').config;
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./models/user');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const { render } = require('ejs');
// const upload = require('./upload');


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

app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define the directory where your views are located (if not in the default 'views' folder)
app.set('views', './views'); // Modify if necessary

app.use(express.urlencoded({extended:true}))

// Use method-override middleware
app.use(methodOverride('_method'));

app.use(express.static('public'));

// app.use('/uploads', express.static('uploads'));

https://drive.google.com/file/d/1fqcDQ1sgLnP1VhP8ifE4AKCfgRsXZeNb/view?usp=drive_link


app.listen(PORT,()=>{
  console.log(`Server started at http://localhost:${PORT}`)
})


app.get('/',async (req,res)=>{
  res.render('login.ejs')
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // Here you would typically validate the email and password
  // For example:
  if (email === 'admin@test.com' && password === 'test'){
    res.redirect('/users')
      // Successful login logic here (e.g., set session, redirect, etc.)
  }
  else {
      // Handle invalid credentials
      res.status(401).send('Invalid email or password');
  }
});

app.get('/users',async(req,res)=>{
 try {
      const allUsers = await User.find();  // Fetch all users from the DB
      // console.log(allUsers);  // Log the users to the console
      res.render('users/homepage.ejs', { allUsers });  // Render the data in EJS (if you're using EJS)
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Server Error');
    }
});


////  create a page to add user
app.get('/addUser',async(req,res)=>{
  res.render('users/addUser.ejs')
})



// Add the user to the database
app.post('/addUsers/create', async (req, res) => {
  const body = req.body;
  const newUser = new User(body); // Create a new user instance

  try {
    await newUser.save(); // Attempt to save the new user
    res.redirect('/users?success=true'); // Redirect to /users on success
  } catch (error) {
    console.log("ERROR!!!", error); // Log the error

    // Collect the error messages to show on the client side
    const errorMessages = Object.values(error.errors).map(err => err.message);

    // Redirect back with error messages
    res.redirect('/users/add?error=' + encodeURIComponent(errorMessages.join(', ')));
  }
});

// Search users by name
app.get('/users/q', async (req, res) => {
  const { name } = req.query; // Get the name from the query parameters
  try {
      const users = await User.find({ name: new RegExp(name, 'i') }); // Case-insensitive search
      res.render('users/homepage.ejs', { allUsers: users }); // Render the homepage with the found users
  } catch (error) {
      console.error('Error searching users:', error);
      res.status(500).send('Server Error');
  }
});



/// get the user --- open the page 
app.get('/users/:id/',async(req,res)=>{
  const {id} = req.params
    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send('Invalid User ID'); // Send a 400 error if the ID is invalid
  }

  try {
      const foundUser = await User.findById(id);
      if (!foundUser) {
          return res.status(404).send('User not found'); // Handle user not found case
      }
      res.render('users/editUser.ejs', { foundUser });
  } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).send('Server Error'); // Handle server error
  }
});

///// update user
app.put('/users/:id/edit',async(req,res)=>{
  const body = req.body
  const {id} = req.params
  try{
    const editUser = await User.findByIdAndUpdate(id,body,{runValidators:true,new:true})
    res.redirect('/users?updated=true'); // Redirect to /users on success
  } catch (error) {
    console.log("ERROR!!!", error); // Log the error

    // Collect the error messages to show on the client side
    const errorMessages = Object.values(error.errors).map(err => err.message);

    // Redirect back with error messages
    
    res.redirect(`/users/${id}/edit?error=` + encodeURIComponent(errorMessages.join(', ')))
  }
})

// Delete a user
app.delete('/users/:id/delete', async (req, res) => {
  const { id } = req.params;
  try {
    await User.deleteOne({ _id: id });
    res.redirect('/users?deleted=true'); // Redirect to /users on success
  } catch (error) {
    console.log("Error deleting user:", error);
    res.redirect('/?success=false'); // Redirect back with failure message
  }
});




app.get('/users/name/:name', async (req, res) => {
  const { name } = req.params;
  try {
      const foundUser = await User.findOne({ name: name });
      if (foundUser) {
          res.render('users/userDetails.ejs', { foundUser });
      } else {
          res.status(404).send("User not found");
      }
  } catch (error) {
      console.log("ERROR!!!", error);
      res.status(500).send("Server Error");
  }
});


// //// upload image
// const upload = require('./upload');

// // Route for handling file upload
// app.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     const imageUrl = `/uploads/images/${req.file.filename}`;
//     // Store imageUrl in your database (e.g., with a user)
//     res.redirect('/users?success=true');
//   } catch (error) {
//     res.status(500).send('Error uploading file');
//   }
// });