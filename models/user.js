/*
MongoDB model for a User
*/
// Grab some required stuff
var mongoose = require('mongoose');
// We use jwt to create, sign, and verify tokens
var jwt = require('jsonwebtoken');

// Create the schema for the model
var userSchema = new mongoose.Schema({
	id: String,
	username: String,
	password: String,
	email: String,
	firstname: String,
	lastname: String
});

// Method to generate & sign a token
userSchema.methods.generateJWT = function() {

  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 1);

  return jwt.sign({
    id: this.id,
    username: this.username,
      exp: parseInt(exp.getTime() / 1000)
  }, 'SECRET');
};

// Export our model
module.exports = mongoose.model('User', userSchema);
