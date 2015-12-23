/*
MongoDB model that represents a Comment
*/
// Grab some required stuff
var mongoose = require('mongoose');

// Create the schema for the model
var commentSchema = new mongoose.Schema({
	content: String,
	author: String,
	_sightingID: mongoose.Schema.Types.ObjectId
});

// Export our model
module.exports = mongoose.model('Comment', commentSchema);
