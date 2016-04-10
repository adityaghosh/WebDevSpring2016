"use strict";

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, model) {

    var auth = function(req, res, next)
    {
         if (!req.isAuthenticated())
         {
             res.send(401);
         }
         else
         {
             next();
         }
    };

    app.get('/api/assignment/user/:id', findUserById);
    app.get('/api/assignment/user', findUser);
    app.post('/api/assignment/user', createUser);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUserById);
    //Added for Security
    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.post('/api/assignment/register', register);
    app.post('/api/assignment/logout', logout);
    app.get('/api/assignment/loggedin', loggedIn);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

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
                    done(null, false);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done)
    {
        done(null, user);
    }

    function deserializeUser(user, done)
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
        newUser.roles = ['student'];

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

    function findUser (req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            var credentials = {
                'username': username,
                'password': password
            };
             model.findUserByCredentials(credentials)
                .then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
        else if (username) {
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
        else {
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

    function findAllUsers (req, res) {
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

    function createUser (req, res) {

        var user = req.body;
        if (typeof user.emails === 'string') {
            user.emails = user.emails.split(",");
            for (var i in user.emails) {
                user.emails[i] = user.emails[i].trim();
            }
        }

        model.createUser(user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById (req, res) {
        var id = req.params.id;
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

    function updateUser (req, res) {
        var id = req.params.id;
        var user = req.body;
        if (typeof user.emails === 'string') {
            user.emails = user.emails.split(",");
            for (var i in user.emails) {
                user.emails[i] = user.emails[i].trim();
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

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true
        }
        return false;
    }
};