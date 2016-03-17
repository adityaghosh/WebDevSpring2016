module.exports = function (app, formModel) {
    app.get('/api/assignment/user/:userId/form', findAllFormsForUser);
    app.get('/api/assignment/form/:formId', findFormById);
    app.delete('/api/assignment/form/:formId', deleteFormById);
    app.post('/api/assignment/user/:userId/form', createFormForUser);
    app.put('/api/assignment/form/:formId', updateFormById);

    function findAllFormsForUser(req, res) {
        var userid = req.params.userId;
        var forms = formModel.findAllFormsForUser(userid);
        res.json(forms);
    }

    function findFormById(req, res) {
        var formid = req.params.formId;
        var form = formModel.findFormById(formid);
        if (form) {
            res.json(form)
        }
        else {
            res.json({message:"Form not found."})
        }
    }

    function deleteFormById(req, res) {
        var formid = req.params.formId;
        var deleted = formModel.deleteFormById(formid);
        if (deleted) {
           res.send(200)
        }
        else {
            res.json({message:"Form not found."});
        }
    }

    function createFormForUser(req, res) {
        var userid = req.params.userId;
        var form = req.body;
        var newForm = formModel.createFormForUser(userid, form);
        if (newForm) {
            res.send(200);
        }
    }

    function updateFormById(req, res) {
        var formid = req.params.formId;
        var form = req.body;
        var newForm = formModel.updateFormById(formid, form);
        if (newForm) {
            res.json(newForm);
        }
        else {
            res.json("Form not found");
        }
    }

};