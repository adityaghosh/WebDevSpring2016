"use strict";
//var forms = require('./form.mock.json');
//var uuid = require('node-uuid');
var q = require('q');
module.exports = function (db, mongoose) {

    var FormSchema = require('./form.schema.server')(mongoose);
    var FormModel = mongoose.model("Form", FormSchema);

    var api = {
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        createFormForUser: createFormForUser,
        getMongooseModel: getMongooseModel,
        updateAllFieldsForForm: updateAllFieldsForForm,
    };

    return api;

    function getMongooseModel () {
        return FormModel;
    }

    function findFormById(id) {

        var deferred = q.defer();
        FormModel.findById(
            id,
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

    function createFormForUser(userId, form) {

        var deferred = q.defer();
        var newForm = {
            "title": form.title,
            "userId": userId,
            "fields": form.fields
        };
        FormModel.create(
            newForm,
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

    function findAllFormsForUser(userId) {

        var deferred = q.defer();
        FormModel.find(
            {userId : userId},
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

    function deleteFormById(formId) {

        var deferred = q.defer();
        FormModel.remove(
            {_id: formId},
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

    function updateFormById(formId, newForm) {

        delete newForm._id;
        var deferred = q.defer();
        newForm.updated = Date.now();
        FormModel.update(
            {_id : formId},
            {$set: newForm},
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

    function updateAllFieldsForForm (formId, fields) {

        var deferred = q.defer();
        FormModel.update(
            {_id : formId},
            {fields: fields},
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