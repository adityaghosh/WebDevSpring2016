module.exports = function (app, model) {

    app.get('/api/assignment/user/:id', findUserById);
    app.get('/api/assignment/user', findUser);
    app.post('/api/assignment/user', createUser);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUserById);

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
        var user = model.findUserById(id)
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
};