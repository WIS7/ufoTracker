var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
	content: String,
	author: String,
	_sightingID: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Comment', commentSchema);