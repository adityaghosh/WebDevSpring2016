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
        delete user.roles;
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