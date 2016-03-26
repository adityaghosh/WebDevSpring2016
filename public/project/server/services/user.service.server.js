"use strict";

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
};