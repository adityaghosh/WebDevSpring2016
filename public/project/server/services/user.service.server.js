"use strict";

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
    // Admin Endpoints
    app.post('/api/project/admin/user', auth, createUser);
    app.get('/api/project/admin/user', auth, findAllUsers);
    app.put('/api/project/admin/user/:id', auth, updateUserAsAdmin);
    app.get('/api/project/admin/user/:id', auth, findUserById);
    app.delete('/api/project/admin/user/:id', auth, deleteUserById);


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