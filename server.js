// app require express 
var express = require("express");

var app = express();

var request = require("request");

// Templating
var ejs = require("ejs");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

// body parser
var bodyParser = require("body-parser");

// tell app which method to use when parsing
app.use(bodyParser.urlencoded({extended: false}));

// method override setup
var methodOverride = require("method-Override");

// tell which overide method to use
app.use(methodOverride("method"));

var bcrypt = require('bcrypt');

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("db/bulletin.db");

// Needed for sessions
var session = require("express-session");

// to retrive api key and password 
var secrets = require('./secrets.json');

app.use(session({
	secret: secrets.password,
	resave: false,
	saveUninitialized: true
}));

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

	// If user is logged in route them to events happening in their borough else route them to all events
	if(req.session.valid_user){

	} 

	else {

	// Make a request to the NYC Event Calendar for a list of events
	request("https://api.cityofnewyork.us/calendar/v1/search.htm?app_id=3488f509&app_key=a58c77685001ce0633fd1b8e8fe61d8e", function(err, response, body){
			if(err){
				console.log(err)
			} 
			else {
				var events = JSON.parse(body).items;
				console.log(events[0].desc)
				res.render("index.ejs", {events:events});
			}
	});
}
});

// route to the login page 
app.get("/login", function(req, res){
	res.render("login.ejs")
});

// Regester New User and persist to the database
app.post("/user", function(req, res){
	console.log("in user");
	// console.log(req.body);

	var username = req.body.username;
	var email = req.body.email;
	var borough = req.body.borough;
	var password = req.body.password;
	var confirm_password = req.body.confirm_password;
	
	// if password and confirm_passwors != redirect to login
	if(password != confirm_password){
		res.redirect("/login");
	} 
	else {
		var hash = bcrypt.hashSync(secrets.password, 10);

		// Create a new user and persist user info to the database
		db.run("INSERT INTO users (username, password, email, borough) VALUES (?, ?, ?, ?)", username, hash, email, borough, function(err){
			if (err) { throw err; }
			console.log(db);
			console.log("here");
			req.session.valid_user = true;
			res.redirect("/events");

			// have to put an exception in /events to make sure user is loged in if so hit the api for results in their borough.
		});

	}


}); 



app.listen("3000");
console.log("Listening on port 3000");












