module.exports = function (app, formModel, fieldModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByIdForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByIdForForm);
    app.post("/api/assignment/form/:formId/field", createNewFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldForForm);
    app.put("/api/assignment/form/:formId/field", updateAllFieldsForForm);

    function getFieldsForForm (req, res) {

        var formid = req.params.formId;
        fieldModel.getFieldsForForm(formid)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFieldByIdForForm (req, res) {
        var formid = req.params.formId;
        var fieldid = req.params.fieldId;

        fieldModel.getFieldByIdForForm(formid, fieldid)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldByIdForForm (req, res) {
        var formid = req.params.formId;
        var fieldid = req.params.fieldId;

        fieldModel.deleteFieldByIdForForm(formid, fieldid)
            .then(
                function (doc) {
                    res.status(200).send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createNewFieldForForm (req, res) {
        var formid = req.params.formId;
        var field = req.body;
        fieldModel.createNewFieldForForm(formid, field)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldForForm (req, res) {
        var formid = req.params.formId;
        var fieldid = req.params.fieldId;
        var newfield = req.body;

        fieldModel.updateFieldForForm(formid, fieldid, newfield)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err)
                }
            );
    }

    function updateAllFieldsForForm(req, res) {
        var formid = req.params.formId;
        var newfields = req.body;
        formModel.updateAllFieldsForForm(formid, newfields)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err)
                }
            );
    }
};