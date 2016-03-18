var forms = require('./form.mock.json');
var uuid = require('node-uuid');
module.exports = function (app) {
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
        updateFieldForForm: updateFieldForForm
    };

    return api;

    function findFormById(id) {
        for (var i in forms) {
            if (forms[i]._id == id) {
                return forms[i];
            }
        }
        return null;
    }

    function createFormForUser(userId, form) {
        var newForm = {
            "_id": uuid.v1(),
            "title": form.title,
            "userId": userId,
            "title": form.title,
            "fields": form.fields
        };
        forms.push(newForm);
        return newForm;
    }

    function findAllFormsForUser(userId) {
        var userForms = [];
        for (var i in forms) {
            if (forms[i].userId == userId){
                userForms.push(forms[i]);
            }
        }
        return userForms;
    }

    function deleteFormById(formId) {
        for (var i in forms){
            if(forms[i]._id == formId){
                forms.splice(i,1);
                return true;
            }
        }
        return false;
    }

    function updateFormById(formId, newForm) {
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
            var newField = {
                "_id": uuid.v1(),
                "title": field.title,
                "label": field.label,
                "type": field.type,
                "placeholder": field.placeholder
            };
            form.fields.push(newField);
            return newField;
        }
        else {
            return null;
        }
    }

    function updateFieldForForm (formId, fieldId, newForm) {
        var form = findFormById(formId);
        if (form) {
            for (var f in form.fields) {
                if (form.fields[f]._id == fieldId) {
                    form.fields[f].title = newForm.title;
                    form.fields[f].placeholder = newForm.placeholder;
                    form.fields[f].type = newForm.type;
                    form.fields[f].label = newForm.label;
                    return form.fields[f];
                }
            }
            return null;
        }
        else {
            return null;
        }
    }
};