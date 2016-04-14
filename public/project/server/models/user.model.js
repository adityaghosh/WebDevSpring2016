"use strict";
"use strict";
var q = require('q');
module.exports = function (db, mongoose){

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('ProjectUser', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUserName: findUserByUserName,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };

    return api;


    function findUserByCredentials(credentials) {

        var deferred = q.defer();
        UserModel.findOne(
            {
                username: credentials.username
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    doc
                        .comparePassword(
                            credentials.password,
                            function (e, isMatch) {
                                if(isMatch){
                                    deferred.resolve(doc);
                                }
                                else {
                                    deferred.reject(e);
                                }
                            });
                }
            }
        );
        return deferred.promise;

    }

    function findUserByUserName(username) {

        var deferred = q.defer();
        UserModel.findOne(
            {
                username: username
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findUserById(id){

        var deferred = q.defer();
        UserModel.findById(
            id,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;

    }

    function findAllUsers() {

        var deferred = q.defer();
        UserModel.find(
            {
                $query:{},
                $orderby: {username:1}
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;

    }

    function createUser(user) {

        // Roles
        if (user.roles){
            if (typeof user.roles === 'string') {
                user.roles = user.roles.split(",");
                for (var i in user.roles) {
                    user.roles[i] = user.roles[i].trim();
                }
            }
        }

        var newUser = new UserModel(user);

        var deferred = q.defer();
        newUser.save(function (err) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(newUser);
            }
        });

        return deferred.promise;

    }

    function deleteUserById(userId) {

        var deferred = q.defer();
        UserModel.remove(
            {
                _id:userId
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function updateUser(userId, user) {

        delete user._id;
        var deferred = q.defer();
        UserModel
            .findById(
                userId,
                function (err, doc) {
                    if (err) {
                        deferred.reject(err)
                    }
                    else {
                        doc.username = user.username;
                        doc.password = user.password;
                        doc.email = user.email;
                        doc.firstName = user.firstName;
                        doc.lastName = user.lastName;
                        doc.roles = user.roles;
                        doc
                            .save(
                                function (er) {
                                    if(er) {
                                        deferred.reject(er);
                                    }
                                    else {
                                        deferred.resolve(doc);
                                    }
                                }
                            );
                    }
                }
            );

        return deferred.promise;
    }


};


/*var users = require("./user.mock.json");
var uuid = require('node-uuid');
module.exports = function (){

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUserName: findUserByUserName,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };

    return api;


    function findUserByCredentials(credentials) {
        var found = null;
        for (var i=0; i < users.length; i++) {
            if (users[i].username == credentials.username && users[i].password == credentials.password) {
                found = users[i];
                break;
            }
        }
        return found;
    }

    function findUserByUserName(username) {
        var found = null;
        for (var i=0; i < users.length; i++) {
            if (users[i].username == username) {
                found = users[i];
                break;
            }
        }
        return found;
    }

    function findUserById(id){
        for (var u in users) {
            if(users[u]._id == id) {
                return users[u]
            }
        }
        return null;
    }

    function findAllUsers() {
        return users;
    }

    function createUser(user) {
        var newUser = {
            "_id":uuid.v1(),
            "firstName": user.firstName,
            "lastName": user.lastName,
            "username":user.username,
            "password": user.password,
            "email": user.email,
            "roles": user.roles
        };
        users.push(newUser);
        return newUser;
    }

    function deleteUserById(userId) {
        for (var i=0; i < users.length; i++) {
            if (users[i]._id == userId) {
                users.splice(i,1);
                return true;
            }
        }
        return false;
    }

    function updateUser(userId, user) {
        var updatedUser = null;
        for (var i=0; i < users.length; i++) {
            if (users[i]._id == userId) {
                users[i].password = user.password;
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                users[i].email = user.email;
                if (user.roles) {
                    users[i].roles = user.roles;
                }
                updatedUser = users[i];
                break;
            }
        }
        return updatedUser;
    }

};*/