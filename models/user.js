// Mongoose schema definition
var mongoose = require('mongoose');
// used to create, sign, and verify tokens
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String
});


userSchema.methods.generateJWT = function() {

  // Yousef gonna change this to 24hours
  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this.id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRET');
};


module.exports = mongoose.model('User', userSchema);