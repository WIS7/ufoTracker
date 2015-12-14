// Package and other dependencies
var mongoose = require('mongoose');
var Sighting = mongoose.model('Sighting');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
// Routes
module.exports = function(app, queries) {

    app.get('/sighting', function(req, res, next){
        var _sightingID = req.query._sightingID;
        queries.getSighting(_sightingID, res, next);
    });

    app.get('/user/sightings', function(req, res, next){
        var author = req.query.author;
        queries.getUserSightings(author, res, next);
    });

    app.delete('/user/sightings', auth, function(req, res, next){
        var _sightingID = req.body._sightingID;
        queries.deleteSighting(_sightingID, res, next);
    });
    
    app.put('/user/sightings', auth, function(req, res, next){
        var sighting = req.body;
        queries.editSighting(sighting, res, next);
    });

    app.get('/sightings', function(req, res, next){
        queries.getAllSightings(res, next);
    });

    app.get('/users', function(req, res, next) {
        queries.getAllUsers(res, next);
    });

    app.post('/sightings', auth, function(req, res, next) {
        var form = req.body;
        form._sightingID = new mongoose.Types.ObjectId;
        form.submittedDate = new Date();
        form.date = new Date(form.year,form.month - 1,form.month);
        var newSighting = new Sighting(form);
        queries.saveSighting(newSighting, res, next);
    });

    app.get('/comments', function(req, res, next){
        var _sightingID = req.query._sightingID;
        queries.getAllComments(_sightingID, res, next);
    });

    app.post('/comment', auth, function(req, res, next) {
        var form = req.body;
        var newComment = new Comment(form);
        queries.saveComment(newComment, res, next);
    });

    app.post('/signup', function(req, res, next){
        if(!req.body.username || !req.body.password){
            return res.status(400).json(
            {message: 'Please fill out all fields'});
        }

        User.findOne({'username' :  req.body.username}, function(err, user){
            if(user){
                return res.status(400).json(
                {message: 'Username already taken'});
            }
            else {
                var user = new User();
                console.log(req.body);
                user.username = req.body.username;
                user.password = req.body.password;
                user.email = req.body.email;
                user.save(function (err){
                    if(err){return next(err);}
                    return res.json({token: user.generateJWT()})
                });
            }
        });
    });
 
    app.post('/login', function(req, res, next){
        if(!req.body.username || !req.body.password){
            return res.status(400).json(
            {message: 'Please fill out all fields'});
        }
        passport.authenticate('local', 
        function(err, user, info){
            if(err){return next(err);}
            if(user){
                return res.json({token: user.generateJWT()});
            }
            else {return res.status(401).json(info);}
        })(req, res, next);
    });

};
