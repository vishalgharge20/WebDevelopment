const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/Users')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/React-CRUD")


app.get('/',async(req,res)=>{
    try {
        const allUsers = await User.find({}); // Wait for the database query to complete
        res.status(200).json(allUsers); // Send the users as a JSON response
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' }); // Send an error response
      }
    });


// create user
app.post("/createUser", async (req, res) => {
    try {
      const { Name, email, Age } = req.body;
      // Create a new user instance
      const newUser = new User({
        Name: Name,
        email: email,
        Age: Age,
      });
      // Save the new user to the database
      await newUser.save();
      console.log(newUser)
      // Send a success response with the saved user
      res.status(201).json({ message: "User created successfully" });
    } 
    catch (error) {
      console.error("Error creating user:", error);
      // Send an error response
      res.status(500).json({ message: "Error creating user", error: error.message });
    }
  });
  

// get user through id
app.get("/updateUser/:id",async (req,res)=>{
  const { id } = req.params; // Get the organization ID from request params
  try {
    const user = await User.findById(id); // Fetch the user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    else{
      res.status(200).json(user); // Send the user data as JSON
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});


// update user
app.put("/updateUser/:id", async (req, res) => {
  const { id } = req.params; // Get the user ID from request params
  const { Name, email, Age } = req.body; // Get the updated user data from request body
  try {
    // Find and update the user by ID
    const updatedUser = await User.findByIdAndUpdate(id, { Name, email, Age }, { new: true });
    // If the user was not found, return a 404 status
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Respond with success and the updated user data
    res.status(200).json({ message: "User Updated successfully", user: updatedUser });
  } catch (error) {
    // Log the error and send a 500 response
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
})


app.delete('/deleteUser/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id); // Await the deletion
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'An error occurred while deleting the user.' });
  }
});



app.listen(3000, ()=>{
    console.log("Server is running")
})

