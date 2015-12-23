var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

// Authentication with passport-local (username + password)
// Based on the example found in the support documentation
// --> http://passportjs.org/docs/username-password
passport.use(new LocalStrategy(
  function(username, password, done) {
      // We're gonna look in the DB for the user

      User.findOne({username: username}, function (err, user) {
          if (err) {
              // There was an error while searching, return it
              return done(err);
          }
          if (!user) {
              // We didn't find a user, so probably an incorrect username
              return done(null, false, {
                  message: 'Username not found'
              });
          }
          if (user.password != password) {
              // Password didn't match, say it
              return done(null, false, {
                  message: 'Password didn\'t match'
              });
          }
          // There were no errors and all parameters matched. Return with the success
          return done(null, user);
      });
  }
));