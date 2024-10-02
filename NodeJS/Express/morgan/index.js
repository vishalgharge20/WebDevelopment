const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'));


// Root Route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});


// Authorization Middleware
const verifyPassword = ((req, res, next) => {
    const { password } = req.query;
    if (password === 'chicken') {
        next();  // Allow the request to continue
    } else {
        return res.send('Sorry, you need a password');
    }
});

// // Dogs Route
// app.use('/dogs', (req, res, next) => {
//     console.log("I Love Dogs!!!");
//     next();  // Continue to the next middleware or route
// });

app.get('/dogs', (req, res) => {
    res.send('WOOF WOOF');
});



// using verifyPassword here
app.get('/secret',verifyPassword,(req,res)=>{
    res.send("Divine is my fav Rapper")
})


// 404 Middleware (Catch-All for Unknown Routes)
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Start the Server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
