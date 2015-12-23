// Grab some required dependencies
var mongoose = require('mongoose');
var Sighting = mongoose.model('Sighting');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

module.exports = {

    // Get a specific sighting using it's ID
    getSighting: function(_sightingID, res, next) {
        var obj = {
          '_sightingID': _sightingID
        };
        // Look for sighting in the DB
        Sighting.findOne(obj, function(err, sighting) {
            if (err) {
              return next(err);
            }
            // Return found sighting if no error
            return res.json(sighting);
        });
    },
    // Delete a specific sighting using it's ID
    deleteSighting: function(_sightingID, res, next) {
        var obj = {
          '_sightingID': _sightingID
        };
        // Remove it in the DB
        Sighting.remove(obj, function(err) {
            if (err) {
              return next(err);
            }
            // Send message of success if no error
            res.send('DELETE request successful');
        });
    },
    // Edit a specific sighting using it's ID
    editSighting: function(sighting, res, next) {
        var  _sightingID = sighting._sightingID;
        var title = sighting.title;
        var description = sighting.description;
        var date = sighting.date;
        // Update it in the DB
        Sighting.update(
            { "_sightingID": _sightingID},
                {"$set":
                    {
                    "title": title,
                    "description": description,
                    "date": date
                    }
                },
            function(err) {
                if (err) {
                  return next(err);
                }
                // Send message of success if no error
                res.send('EDIT request successful');
            }
        );
    },
    // Get all sightings from a specific user
    getUserSightings: function(author, res, next) {
        var obj = {
          'author': author
        };
        // Find the sightings in the DB
        Sighting.find(obj, function(err, sightings) {
            if (err) {
              return next(err);
            }
            // Return the sightings if no error
            return res.json(sightings);
        });
    },
    // Get user information from a specific user
    getUser: function (_username, res, next) {
        var obj = {
            'username': _username
        };
        // What to do
        var query = User.findOne(obj);
        // What to select
        query.select('username email firstname lastname');
        // Execute query in the DB
        query.exec(function (err, user) {
            if (err) {
                return next(err)
            }
            res.json(user)
        })
    },
    // Edit user information from a specific user
    editUser: function (user, res, next) {
        var username = user.username;
        var email = user.email;
        var firstname = user.firstname;
        var lastname = user.lastname;
        // Update it in the DB
       User.update(
            { "username": username},
                {"$set":
                    {
                    "email": email,
                    "firstname": firstname,
                    "lastname": lastname
                    }
                },
            function(err) {
                if (err) {
                  return next(err);
                }
                // Send message of success if no error
                res.send('EDIT request successful');
            }
        );
    },
    // Get all sightings in the DB sorted by date of submit
	getAllSightings: function(res, next) {
        Sighting.find({}).sort({'submittedDate': 'desc'}).exec(
            function(err, sightings){
                if (err) {
                  return next(err);
                }
                res.json(sightings);
             }
        );
	},
  // Save a new sighting in the DB
	saveSighting: function(sighting, res, next) {
        sighting.save(function(err){
            if (err) {
              return next(err);
            }
            // Send message of success if no error
            res.send('POST request successful');
        });
	},
  // Get all comments for a specific sighting
	getAllComments: function(ID, res, next){
        Comment.find({'_sightingID': ID}, function(err, comments) {
            if (err) {
              return next(err);
            }
            res.json(comments);
         });
	},
	saveComment: function(comment, res, next) {
        comment.save(function(err){
            if (err) {
              return next(err);
            }
            // Send message of success if no error
            res.send('POST request successful');
        });
	}
};
