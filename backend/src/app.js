// Importing required modules
const express = require('express');  
const bodyParser = require('body-parser');      // Used for parsing the request body
const taskRoute = require('./routes/routes');   // Importing the router
const cookieParser = require('cookie-parser');  // CSRF Cookie parsing
const session = require('express-session');     // For creating user session
const cors = require("cors")

// Creating react app
var app = express();  

// Mounting middleware
// Parse application/json and application/x-www-form-urlencoded (For parsing request body)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors());
app.use(session({
    secret: 'abcd1234', // Replace with your own secret key
    resave: true,
    saveUninitialized: true
}));

// Routing requests
app.use('/task' , taskRoute);

// Starting server at port 8000
var server = app.listen(8000, function () {  
    var host = server.address().address;  
    var port = server.address().port;  
    console.log('TaskManager app listening at http://%s:%s', host, port);  
})