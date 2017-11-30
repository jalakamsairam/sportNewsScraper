var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan"); 
var mongoose = require("mongoose");
var expressHandleBars = require("express-handlebars");
var routes = require("./controllers/pageController.js");
//our scraping tools
//Axios is a promised-based http library, similar to jquery's ajax method
// It works on the client and on the server

var axios = require("axios");
var cheerios = require("cheerio");

//require all models

var db = require("./models");

var PORT = process.env.PORT || 3001;

//Initialize  Express

var app = express();

//Configure middleware

//use morgan

app.use(logger("dev"));

//use body-parser for handling form submissions

app.use(bodyParser.urlencoded({ extended: false }));

//use express-static to serve the public folder as a static directory

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressValidator());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.engine("handlebars", expressHandleBars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/", routes);

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/newsScraper",
  {
    useMongoClient: true
  }
);


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  