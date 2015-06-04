// app require express 
var express = require("express");
var app = express();
var request = require("request");
// Templating
var ejs = require("ejs");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/Public"));

// body parser
var bodyParser = require("body-parser");

// tell app which method to use when parsing
app.use(bodyParser.urlencoded({extended: false}));

// method override setup
var methodOverride = require("method-Override");
// tell which overide method to use
app.use(methodOverride("method"));

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("db/bulletin.db");

// to retrive api key
var secrets = require('./secrets.json');

// New York events calendar api
// begining of api search string before the search term
var apiStart = "https://api.cityofnewyork.us/calendar/v1/search.htm?"

// retrive app_id for API from secrets.json
var app_id = secrets.app_id;

// retrive app_key for API from secrets.json
var app_key = secrets.app_key;

// Redirect to the events page
app.get("/", function(req, res){
	res.redirect("/events");
});

// Show a list of all events taking place in NYC five boroughs
app.get("/events", function(req, res){

	// Make a request to the NYC Event Calendar for a list of events
	request("https://api.cityofnewyork.us/calendar/v1/search.htm?app_id=3488f509&app_key=a58c77685001ce0633fd1b8e8fe61d8e", function(err, response, body){
			if(err){
				console.log(err)
			} else {
				var events = JSON.parse(body).items;
				console.log(events[0].name);
				console.log(events[0].desc);
			}
	});
});

app.listen("3000");
console.log("Listening on port 3000");












