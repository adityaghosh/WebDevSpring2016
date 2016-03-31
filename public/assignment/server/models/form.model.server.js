"use strict";
var forms = require('./form.mock.json');
var uuid = require('node-uuid');
var q = require('q');
module.exports = function (mongoose) {

    var FormSchema = require('./form.schema.server')(mongoose);
    var FormModel = mongoose.model("Form", FormSchema);

    var api = {
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        createFormForUser: createFormForUser,
        // For Fields
        getFieldsForForm: getFieldsForForm,
        getFieldByIdForForm: getFieldByIdForForm,
        deleteFieldByIdForForm: deleteFieldByIdForForm,
        createNewFieldForForm: createNewFieldForForm,
        updateFieldForForm: updateFieldForForm,
        updateAllFieldsForForm: updateAllFieldsForForm
    };

    return api;

    function findFormById(id) {
        /*for (var i in forms) {
            if (forms[i]._id == id) {
                return forms[i];
            }
        }
        return null;
        */

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
        /*
        var newForm = {
            "_id": uuid.v1(),
            "title": form.title,
            "userId": userId,
            "fields": form.fields
        };
        forms.push(newForm);
        return newForm;
        */

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
        /*
        var userForms = [];
        for (var i in forms) {
            if (forms[i].userId == userId){
                userForms.push(forms[i]);
            }
        }
        return userForms;
        */
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
        /*
        for (var i in forms){
            if(forms[i]._id == formId){
                forms.splice(i,1);
                return true;
            }
        }
        return false;
        */
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
        /*
        var updatedForm = null;
        for (var i in forms) {
            if (forms[i]._id == formId) {
                forms[i].title = newForm.title;
                forms[i].userId = newForm.userId;
                forms[i].fields = newForm.fields;
                updatedForm = forms[i];
                break;
            }
        }
        return updatedForm;
        */
        var deferred = q.defer();
        newForm.updated = Date.now();
        FormModel.update(
            {_id : formId},
            {$set: newForm},
            {$currentDate : {updated: true}},
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

    //Field Functions
    function getFieldsForForm (formId) {
        var form = findFormById(formId);
        if (form) {
            return form.fields;
        }
        else {
            return null;
        }
    }

    function getFieldByIdForForm (formId, fieldId) {
        var form = findFormById(formId);
        if (form) {
            for (var f in form.fields) {
                if (form.fields[f]._id == fieldId) {
                    return form.fields[f];
                }
            }
            return null;
        }
        else {
            return null;
        }
    }

    function deleteFieldByIdForForm (formId, fieldId) {
        var form = findFormById(formId);
        if (form) {
            for (var f in form.fields) {
                if (form.fields[f]._id == fieldId) {
                    form.fields.splice(f,1);
                    return true;
                }
            }
            return false;
        }
        else {
            return false;
        }
    }

    function createNewFieldForForm (formId, field) {
        var form = findFormById(formId);
        if (form) {
            field["_id"] = uuid.v1();
            form.fields.push(field);
            return field;
        }
        else {
            return null;
        }
    }

    function updateFieldForForm (formId, fieldId, newField) {
        var form = findFormById(formId);
        if (form) {
            for (var f in form.fields) {
                if (form.fields[f]._id == fieldId) {
                    form.fields[f] = newField;
                    return form.fields[f];
                }
            }
            return null;
        }
        else {
            return null;
        }
    }
    function updateAllFieldsForForm (formId, fields) {
        var form = findFormById(formId);
        if (form) {
            form.fields = fields;
            return form.fields;
        }
        else {
            return null;
        }
    }
};