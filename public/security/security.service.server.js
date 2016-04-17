var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var SoundCloudStrategy = require('passport-soundcloud').Strategy;

var SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
var SOUNDCLOUD_CLIENT_SECRET = process.env.SOUNDCLOUD_CLIENT_SECRET;
var SOUNDCLOUD_REDIRECT_URL = process.env.SOUNDCLOUD_REDIRECT_URL;

module.exports = function(app, userModelAssignment, userModelProject) {

    //Assignment
    app.post('/api/assignment/login', passport.authenticate('assignment'), login);
    app.post('/api/assignment/register', register);
    app.post('/api/assignment/logout', logout);
    app.get('/api/assignment/loggedin', loggedIn);

    //Project
    app.post('/api/project/login', passport.authenticate('project'), loginProject);
    app.post('/api/project/register', registerProject);
    app.post('/api/project/logout', logoutProject);
    app.get('/api/project/loggedIn', loggedInProject);

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
        callbackURL: SOUNDCLOUD_REDIRECT_URL,
        passReqToCallback : true
    };

    passport.use(new SoundCloudStrategy(soundCloudConfig, soundCloudStrategy));
    passport.use('project', new LocalStrategy(projectLocalStrategy));
    passport.use('assignment', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeProjectUser);
    passport.deserializeUser(deserializeProjectUser);

    function soundCloudStrategy(req, accessToken, refreshToken, profile, done) {
        if (!req.user) {
            userModelProject
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
                            console.log(newSoundCloudUser);
                            return userModelProject.createUser(newSoundCloudUser);
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
            userModelProject.updateUser(req.user._id, user)
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

    function projectLocalStrategy(username, password, done)
    {
        userModelProject
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
        if (user.type == "project") {
            userModelProject
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
        else {
            userModelAssignment
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
    }

    function loginProject(req, res)
    {
        var user = req.user;
        res.json(user);
    }

    function loggedInProject(req, res)
    {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logoutProject(req, res)
    {
        req.logOut();
        res.send(200);
    }

    function registerProject(req, res)
    {
        var newUser = req.body;
        newUser.roles = ['user'];

        userModelProject
            .findUserByUserName(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModelProject.createUser(newUser);
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

    //Assignment
    function localStrategy(username, password, done)
    {
        userModelAssignment
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

        userModelAssignment
            .findUserByUserName(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModelAssignment.createUser(newUser);
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

};