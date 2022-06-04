const express = require('express');
const bodyParser = require('body-parser');
// Test auth
const auth = require('./src/controllers/auth') 

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a root route
app.get('/', (req, res) => {
    res.status(200).json({
        "error": false,
        "message": "Hello all 👋. This is demo for CC-25"
    });
});

// Test auth
app.get('/welcome', auth, (req, res) => {
    res.status(200).json({
        "error": false,
        "message": "Hello all 👋. The auth is works!"
    });
});

// Import employeeRoutes and userRoutes and using it as middleware
const employeeRoutes = require("./src/routes/employee.routes");
const userRoutes = require("./src/routes/user.routes");
app.use("/v1/employees", employeeRoutes)
app.use("/v1/user", userRoutes)

module.exports = app;