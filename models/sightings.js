// Mongoose schema definition for sightings
var mongoose = require('mongoose');

var sightingSchema = new mongoose.Schema({
    _sightingID: mongoose.Schema.Types.ObjectId,
	title: String,
    description: String,
    author: String,
    comments: [mongoose.Schema.Types.ObjectId],
    url: String,
    date: String, // voorlopig
    coordinate: {
    	longitude: {type: Number, default: 4.3575},
    	latitude: {type: Number, default: 50.7465}
    }
});


module.exports = mongoose.model('Sighting', sightingSchema);