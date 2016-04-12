"use strict";
var q = require('q');
module.exports = function (db, mongoose){

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('User', UserSchema);

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
                username: credentials.username,
                password: credentials.password
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

        // Massaging the incoming data to reflect Schema.
        // Emails
        if (user.emails){
            if (typeof user.emails === 'string') {
                user.emails = user.emails.split(",");
                for (var i in user.emails) {
                    user.emails[i] = user.emails[i].trim();
                }
            }
        }
        // Roles
        if (user.roles){
            if (typeof user.roles === 'string') {
                user.roles = user.roles.split(",");
                for (var i in user.roles) {
                    user.roles[i] = user.roles[i].trim();
                }
            }
        }

        var deferred = q.defer();
        UserModel.create(
            user,
            function(err, doc){
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
        UserModel.update(
            {
                _id: userId
            },
            {
                $set: user
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


};