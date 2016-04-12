"use strict";

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, model) {

    var auth = function(req, res, next)
    {
         if (!req.isAuthenticated())
         {
             res.send(403);
             //res.status(403).send();
         }
         else
         {
             next();
         }
    };

    app.put('/api/assignment/user/:id', updateUser);
    app.get('/api/assignment/user', findUserByUserName);
    // Added for Security
    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.post('/api/assignment/register', register);
    app.post('/api/assignment/logout', logout);
    app.get('/api/assignment/loggedin', loggedIn);
    // Admin Endpoints
    app.post('/api/assignment/admin/user', auth, createUser);
    app.get('/api/assignment/admin/user', auth, findAllUsers);
    app.put('/api/assignment/admin/user/:id', auth, updateUserAsAdmin);
    app.get('/api/assignment/admin/user/:id', auth, findUserById);
    app.delete('/api/assignment/admin/user/:id', auth, deleteUserById);


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
                    if (err) {
                        return done(err);
                    }
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

    function findUserById(req, res) {
        var id = req.params.id;
        if (isAdmin(req.user)) {
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
        else {
            res.send(401);
        }
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
        if (typeof user.emails === 'string') {
            user.emails = user.emails.split(",");
            for (var i in user.emails) {
                user.emails[i] = user.emails[i].trim();
            }
        }
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