//dependencies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");

//set up port
var PORT = process.env.PORT || 3000;

//initialize express
var app = express();
var router = express.Router();

//designate public folder and set up handlebars with express app
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use(router);

//connecting to mongo
var db = require("./models");

mongoose.connect("mongodb://localhost/mongoScraper", { useNewUrlParser: true });


//listening on port
app.listen(PORT, function () {
    console.log("Listening on port:" + PORT);
});