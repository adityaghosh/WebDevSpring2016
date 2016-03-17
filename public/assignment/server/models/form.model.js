var forms = require('./form.mock.json');
module.exports = function (app) {
    var api = {
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        deleteFormById: deleteFormById,
        updateFormById:updateFormById,
        createFormForUser: createFormForUser
        /*findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById*/
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
            "_id": (new Date).getTime(),
            "title": form.title,
            "userId": userId
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
                updatedForm = forms[i];
                break;
            }
        }
        return updatedForm;
    }
};