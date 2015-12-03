// Mongoose schema definition for sightings
var mongoose = require('mongoose');

var sightingSchema = new mongoose.Schema({
    _sightingID: mongoose.Schema.Types.ObjectId,
	title: String,
    description: String,
    author: String,
    comments: String,
    url: String,
    date: Date,
    coordinate: {
    	longitude: Number,
    	latitude: Number
    }
});


module.exports = mongoose.model('Sighting', sightingSchema);