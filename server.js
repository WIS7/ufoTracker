// Package dependencies
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 27017;
var mongoose = require('mongoose');
var passport = require('passport');
var morgan       = require('morgan');
var bodyParser   = require('body-parser');

// Configuration and set up

// DB configuration
var db = require('./config/database.js');
mongoose.connect(db.url); 
require('./models/user');
require('./models/sightings');
require('./config/passport'); 

// Setting up the view to be plain html + access to need files
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));


// morgan logs every request on console
app.use(morgan('dev')); 
// body-parser get information from html forms and exposes it 
// on req.body (usefull as it is easier to interface with.)
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
 
// Initialize passport
app.use(passport.initialize());

// routes (need to be added after DB setup)
var routes = require('./routes/routes.js');
routes(app);

// launch 
app.listen(port);
console.log('Server running on port ' + port);