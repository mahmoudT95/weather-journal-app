// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
const { response } = require("express");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening() {
  console.log("server working");
  console.log(`running on localhost: ${port}`);
}

// Add a GET route that returns the projectData
app.get("/all", getData);
function getData(req, res) {
  res.send(projectData);
}

// add a POST route
const data = [];
app.post("/add", addData);

function addData(req, res) {
  projectData.date = req.body.date;
  projectData.temp = req.body.temp;
  projectData.content = req.body.content;
  res.send(projectData);
}
