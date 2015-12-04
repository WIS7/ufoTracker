var mongoose = require('mongoose');
var Sighting = mongoose.model('Sighting');
var User = mongoose.model('User');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

module.exports = function(app) {

    app.get('/sightings', function(req, res, next){
        // get all sightings from db
        // todo aparte file die alle db queries
        // gaat handelen
        Sighting.find(function(err, sightings){
            if(err){return next(err);}
            res.json(sightings);
         });
    });

    app.post('/sightings', auth, function(req, res, next) {
        // create new sighting and save it
        var form = req.body;
        form._sightingID = new mongoose.Types.ObjectId;
        var newSighting = new Sighting(form);
        console.log(form);
        newSighting.save(function(err){
            if(err){return next(err);}
        });
    });

    app.post('/signup', function(req, res, next){
        if(!req.body.username || !req.body.password){
            return res.status(400).json(
            {message: 'Please fill out all fields'});
        }
        // todo check if user already exist (see passport)
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.save(function (err){
            if(err){return next(err);}
            return res.json({token: user.generateJWT()})
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
