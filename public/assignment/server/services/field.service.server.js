module.exports = function (app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByIdForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByIdForForm);
    app.post("/api/assignment/form/:formId/field", createNewFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldForForm);
    app.put("/api/assignment/form/:formId/field", updateAllFieldsForForm);

    function getFieldsForForm (req, res) {
        var formid = req.params.formId;
        var fields = formModel.getFieldsForForm(formid);
        if (fields) {
            res.json(fields);
        }
        else {
            res.json({message:"Not found"});
        }
    }

    function getFieldByIdForForm (req, res) {
        var formid = req.params.formId;
        var fieldid = req.params.fieldId;
        var field = formModel.getFieldByIdForForm(formid, fieldid);
        if (field) {
            res.json(field);
        }
        else {
            res.json({message:"Not found"});
        }
    }

    function deleteFieldByIdForForm (req, res) {
        var formid = req.params.formId;
        var fieldid = req.params.fieldId;
        var deleted = formModel.deleteFieldByIdForForm(formid, fieldid);
        if (deleted) {
            res.send(200);
        }
        else {
            res.json({message:"Field not found"});
        }
    }

    function createNewFieldForForm (req, res) {
        var formid = req.params.formId;
        var field = req.body;
        var newfield = formModel.createNewFieldForForm(formid,field);
        if (newfield) {
            res.json(newfield);
            res.send(200);
        }
        else {
            res.json({message:"Form not found"});
        }
    }

    function updateFieldForForm (req, res) {
        var formid = req.params.formId;
        var fieldid = req.params.fieldId;
        var newfield = req.body;
        var updatedField = formModel.updateFieldForForm(formid, fieldid, newfield);
        if (updatedField) {
            res.json(updatedField);
        }
        else {
            res.json({message:"Form not found"})
        }
    }

    function updateAllFieldsForForm(req, res) {
        var formid = req.params.formId;
        var newfields = req.body;
        var fields = formModel.updateAllFieldsForForm(formid, newfields);
        res.json(fields);
    }
};