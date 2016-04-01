"use strict";
var q = require('q');
module.exports = function (db, mongoose, FormModel) {

    var FieldSchema = require('./field.schema.server')(mongoose);
    var FieldModel = mongoose.model("Field", FieldSchema);
    var FormMongooseModel = FormModel.getMongooseModel();

    var api = {
        getFieldsForForm: getFieldsForForm,
        getFieldByIdForForm: getFieldByIdForForm,
        deleteFieldByIdForForm: deleteFieldByIdForForm,
        createNewFieldForForm: createNewFieldForForm,
        updateFieldForForm: updateFieldForForm
    };

    return api;

    function getFieldsForForm (formId) {

        var deferred = q.defer();
        FormMongooseModel.findById(
            formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc.fields);
                }
            }
        );

        return deferred.promise;

    }

    function getFieldByIdForForm (formId, fieldId) {

        var deferred = q.defer();
        FormMongooseModel.findById(
            formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc.fields.id(fieldId));
                }
            }
        );

        return deferred.promise;

    }

    function deleteFieldByIdForForm (formId, fieldId) {

        var deferred = q.defer();
        FormMongooseModel.update(
            {_id: formId},
            {$pull: {fields: {_id:fieldId}}},
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

    function createNewFieldForForm (formId, field) {

        var deferred = q.defer();
        var newField = new FieldModel(field);
        FormMongooseModel.update(
            {_id: formId},
            {$push: {fields: newField}},
            function (err, doc2) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(newField);
                }
            }
        );
        return deferred.promise;

    }

    function updateFieldForForm (formId, fieldId, newField) {

        var deferred = q.defer();
        FormMongooseModel.update(
            {_id:formId, "fields._id":fieldId},
            {$set: {
                "fields.$.label": newField.label,
                "fields.$.placeholder": newField.placeholder,
                "fields.$.options": newField.options
            }},
            function (err, doc) {
                if(err) {
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