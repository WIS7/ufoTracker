// Dependencies
var mongoose = require('mongoose');
var Sighting = mongoose.model('Sighting');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

module.exports = {

    getSighting: function(_sightingID, res, next){
        var obj = {'_sightingID': _sightingID};
        Sighting.findOne(obj, function(err, sighting){
            if(err){return next(err);}
            return res.json(sighting);
        });
    },
    deleteSighting: function(_sightingID, res, next){
        var obj = {'_sightingID': _sightingID};
        Sighting.remove(obj, function(err){
            if(err){return next(err);}
            res.send('DELETE request successful');
        });
    },

    editSighting: function(sighting, res, next){
        var  _sightingID = sighting._sightingID;
        var title = sighting.title;
        var description = sighting.description;
        var date = sighting.date;
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
                if(err){return next(err);}
                res.send('EDIT request successful'); 
            }
        );      
    },

    getUserSightings: function(author, res, next){
        var obj = {'author': author};
        Sighting.find(obj, function(err, sightings){
            if(err){return next(err);}
            return res.json(sightings);
        });
    },
    getAllUsers: function(res, next) {
        var query = User.find();
        query.select('username');
        query.exec(function(err, users) {
            if (err) {
                return next(err)
            }
            res.json(users)
        })
    },
    getUser: function (_username, res, next) {
        var obj = {
            'username': _username
        };
        var query = User.findOne(obj);
        query.select('username email firstname lastname');
        query.exec(function (err, user) {
            if (err) {
                return next(err)
            }
            res.json(user)
        })
    },

    editUser: function (user, res, next){
        var  username = user.username;
        var email= user.email;
        var firstname = user.firstname;
        var lastname = user.lastname;
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
                if(err){return next(err);}
                res.send('EDIT request successful'); 
            }
        );  
    },

	getAllSightings: function(res, next){
        Sighting.find({}).sort({'submittedDate': 'desc'}).exec(
            function(err, sightings){
                if(err){return next(err);}
                res.json(sightings);
             }
        );
	},
	saveSighting: function(sighting, res, next){
        sighting.save(function(err){
            if(err){return next(err);}
            res.send('POST request successful');
        });
	},
	getAllComments: function(ID, res, next){
        Comment.find({'_sightingID': ID},function(err, comments){
            if(err){return next(err);}
            res.json(comments);
         });		
	},
	saveComment: function(comment, res, next){
        comment.save(function(err){
            if(err){return next(err);}
            res.send('POST request successful');
        });
	}
};