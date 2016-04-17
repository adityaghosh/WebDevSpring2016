"use strict";

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var SoundCloudStrategy = require('passport-soundcloud').Strategy;
var SOUNDCLOUD_CLIENT_ID = '14325a4a3ec62d73a1b51445bab1e644';
var SOUNDCLOUD_CLIENT_SECRET = '298d053f85f90fce4d5f5ba4f66c0316';
module.exports = function (app, model) {

    var auth = function(req, res, next)
    {
        if (!req.isAuthenticated())
        {
            res.send(403);
        }
        else
        {
            next();
        }
    };

    app.get('/api/project/user', findUserByUserName);
    app.put('/api/project/user/:id', auth, updateUser);
    app.get('/api/project/user/:id', auth, findUserById);
    // Added for Security
    app.post('/api/project/login', passport.authenticate('project'), login);
    app.post('/api/project/register', register);
    app.post('/api/project/logout', logout);
    app.get('/api/project/loggedIn', loggedIn);
    // Admin Endpoints
    app.post('/api/project/admin/user', auth, createUser);
    app.get('/api/project/admin/user', auth, findAllUsers);
    app.put('/api/project/admin/user/:id', auth, updateUserAsAdmin);
    app.get('/api/project/admin/user/:id', auth, findUserById);
    app.delete('/api/project/admin/user/:id', auth, deleteUserById);

    app.get   ('/auth/soundcloud', passport.authenticate('soundcloud'));
    app.get   ('/auth/soundcloud/callback',
        passport.authenticate('soundcloud', {
            //successRedirect: '/project/client/index.html#/profile',
            failureRedirect: '/project/client/index.html#/login'
        })
        ,
        function (req, res) {
            res.redirect('/project/client/index.html#/profile/'+req.user._id)
        }
    );


    var soundCloudConfig= {
        clientID: SOUNDCLOUD_CLIENT_ID,
        clientSecret: SOUNDCLOUD_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/soundcloud/callback",
        passReqToCallback : true

    };

    passport.use(new SoundCloudStrategy(soundCloudConfig, soundCloudStrategy));

    passport.use('project', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeProjectUser);
    passport.deserializeUser(deserializeProjectUser);

    function soundCloudStrategy(req, accessToken, refreshToken, profile, done) {
        if (!req.user) {
            model
                .findUserBySoundCloudId(profile.id)
                .then(
                    function(user) {
                        if(user) {
                            return done(null, user);
                        } else {
                            var names = profile.displayName.split(" ");
                            var newSoundCloudUser = {
                                lastName:  names[1],
                                firstName: names[0],
                                soundCloud: {
                                    id:    profile.id,
                                    token: accessToken
                                }
                            };
                            return model.createUser(newSoundCloudUser);
                        }
                    },
                    function(err) {
                        if (err) { return done(err); }
                    }
                )
                .then(
                    function(user){
                        return done(null, user);
                    },
                    function(err){
                        if (err) { return done(err); }
                    }
                );
        }
        else {
            var user = req.user;
            user.soundCloud = {
                id:    profile.id,
                token: accessToken
            };
            model.updateUser(req.user._id, user)
                .then(
                    function (user) {
                        return done(null,user);
                    },
                    function (err) {
                        return done(err);
                    }
                );
        }

    }

    function localStrategy(username, password, done)
    {
        model
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user)
                {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                },
                function(err) {
                    return done(err);
                }
            );
    }

    function serializeProjectUser(user, done)
    {
        done(null, user);
    }

    function deserializeProjectUser(user, done)
    {
        model
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res)
    {
        var user = req.user;
        res.json(user);
    }

    function loggedIn(req, res)
    {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res)
    {
        req.logOut();
        res.send(200);
    }

    function register(req, res)
    {
        var newUser = req.body;
        newUser.roles = ['user'];

        model
            .findUserByUserName(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return model.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err)
                        {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var id = req.params.id;
        model.findUserById(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUserName(req, res) {
        var username = req.query.username;
        model.findUserByUserName(username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers (req, res) {
        if (isAdmin(req.user)){
            model.findAllUsers()
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
        else {
            res.send(401);
        }
    }

    function createUser (req, res) {

        var newUser = req.body;
        if (isAdmin(req.user)){
            model
                .findUserByUserName(newUser.username)
                .then(
                    function(user){
                        if(user) {
                            res.json(null);
                        } else {
                            return model.createUser(newUser);
                        }
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (user) {
                        res.json(user);
                    },
                    function (err) {
                        res.status(400).send();
                    }
                );

        }
        else {
            res.send(401);
        }
    }

    function deleteUserById (req, res) {
        var id = req.params.id;
        if (isAdmin(req.user)){
            model.deleteUserById(id)
                .then(
                    function (doc) {
                        res.send(200);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
        else {
            res.send(401);
        }
    }

    function updateUser (req, res) {
        var id = req.params.id;
        var user = req.body;

        delete user.roles;
        model.updateUser(id,user)
            .then(
                function (doc) {
                    res.json(doc);
                    res.status(200).send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function updateUserAsAdmin(req, res) {
        var id = req.params.id;
        var user = req.body;
        if (isAdmin(req.user)) {
            if (typeof user.roles === 'string') {
                user.roles = user.roles.split(",");
                for (var i in user.roles) {
                    user.roles[i] = user.roles[i].trim();
                }
            }
            model.updateUser(id,user)
                .then(
                    function (doc) {
                        res.status(200).send(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
        else {
            res.send(401);
        }
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > -1) {
            return true;
        }
        return false;
    }
};

/*"use strict";

module.exports = function (app, model) {

    app.get('/api/project/user/:id', findUserById);
    app.get('/api/project/user', findUser);
    app.post('/api/project/user', createUser);
    app.put('/api/project/user/:id', updateUser);
    app.delete('/api/project/user/:id', deleteUserById);

    function findUser (req, res) {
        if (req.query.username && req.query.password) {
            var credentials = {
                username: req.query.username,
                password: req.query.password
            };
            res.json( model.findUserByCredentials(credentials));
        }
        else if (req.query.username) {
            res.json(model.findUserByUserName(req.query.username));
        }
        else {
            res.json(model.findAllUsers());
        }
    }

    function findUserById(req, res) {
        var id = req.params.id;
        var user = model.findUserById(id);
        if(user) {
            res.json(user);
        }
        else {
            res.json({message:"User not found"});
        }
    }

    function findUserByCredentials (req, res){
        var username = req.query.username;
        var password = req.query.password;
        var credentials = {
            'username': username,
            'password': password
        };
        var user = model.findUserByCredentials(credentials);
        if (user) {
            res.json(user);
        }
        else {
            res.json({message:"User not found"});
        }
    }

    function findUserByUserName (req, res) {
        var username = req.query.username;
        var user = model.findUserByUserName(username);
        if (user) {
            res.json(user);
        }
        else {
            res.json({message:"User not found"});
        }
    }

    function findAllUsers (req, res) {
        var users = model.findAllUsers();
        res.json(users);
    }

    function createUser (req, res) {
        var user = req.body;
        var newUser = model.createUser(user);
        res.json(newUser);
        res.send(200);
    }
    function deleteUserById (req, res) {
        var id = req.params.id;
        var deleted = model.deleteUserById(id);
        if (deleted) {
            res.send(200);
        }
        else {
            res.json({message:"User not found."})
        }
    }

    function updateUser (req, res) {
        var id = req.params.id;
        var user = req.body;
        user = model.updateUser(id,user);
        if (user) {
            res.json(user);
        }
        else {
            res.json({message:"User not found."})
        }
    }
};*/