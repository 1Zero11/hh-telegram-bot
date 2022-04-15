

// Import builtin NodeJS modules to instantiate the service
const https = require("https");
const fs = require("fs");

// Import the express module
const express = require("express");

// Instantiate an Express application
const app = express();

var privateKey = fs.readFileSync('private-nodejs-heroku.key');
var certificate = fs.readFileSync('public-nodejs-heroku.pem');

// Create a NodeJS HTTPS listener on port 4000 that points to the Express app
// Use a callback function to tell when the server is created.
https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(8443);

// Create an try point route for the Express app listening on port 4000.
// This code tells the service to listed to any request coming to the / route.
// Once the request is received, it will display a message "Hello from express server."
app.get('/', (req, res) => {
    res.send("Hello from express server.")
})

