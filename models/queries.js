// Dependencies
var mongoose = require('mongoose');
var Sighting = mongoose.model('Sighting');
var Comment = mongoose.model('Comment');

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

//---------------------------------------------------
    editSighting: function(sighting, res, next){
   
    },
//---------------------------------------------------

    getUserSightings: function(author, res, next){
        var obj = {'author': author};
        Sighting.find(obj, function(err, sightings){
            if(err){return next(err);}
            return res.json(sightings);
        });
    },
	getAllSightings: function(res, next){
        Sighting.find(function(err, sightings){
            if(err){return next(err);}
            res.json(sightings);
         });
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