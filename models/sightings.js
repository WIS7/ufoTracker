// Mongoose schema definition for sightings
var mongoose = require('mongoose');

var sightingSchema = new mongoose.Schema({
	id: String,
	title: String, 
    description: String,
    author: String
});


module.exports = mongoose.model('Sighting', sightingSchema);