/*
MongoDB model that represents a UFO Sighting
*/
// Grab some required stuff
var mongoose = require('mongoose');

// Create the schema for the model
var sightingSchema = new mongoose.Schema({
    _sightingID: mongoose.Schema.Types.ObjectId,
	  title: String,
    description: String,
    author: String,
    comments: [mongoose.Schema.Types.ObjectId],
    url: String,
    date: Date,
    submittedDate: Date,
    coordinate: {
    	longitude: {type: Number, default: 4.3575},
    	latitude: {type: Number, default: 50.7465}
    }
});

// Export our model
module.exports = mongoose.model('Sighting', sightingSchema);
