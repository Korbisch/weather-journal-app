// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross-origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
// Callback to debug
const callback = () => {
    console.log(`App listening on port ${port}`);
}

// Initialize all routes with a callback function
const port = 3000;
app.listen(port, callback );

// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
    res.send(projectData);
})

// Post Route
app.post('/add', (req, res) => {
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['feel'] = req.body.feel;
    console.log(projectData);
    res.status('POST request successful');
})