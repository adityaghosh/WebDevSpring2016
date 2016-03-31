module.exports = function (app, formModel) {
    app.get('/api/assignment/user/:userId/form', findAllFormsForUser);
    app.get('/api/assignment/form/:formId', findFormById);
    app.delete('/api/assignment/form/:formId', deleteFormById);
    app.post('/api/assignment/user/:userId/form', createFormForUser);
    app.put('/api/assignment/form/:formId', updateFormById);

    function findAllFormsForUser(req, res) {
        /*
        var userid = req.params.userId;
        var forms = formModel.findAllFormsForUser(userid);
        res.json(forms);
        */
        var userid = req.params.userId;
        formModel.findAllFormsForUser(userid)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function findFormById(req, res) {
        /*
        var formid = req.params.formId;
        var form = formModel.findFormById(formid);
        if (form) {
            res.json(form)
        }
        else {
            res.json({message:"Form not found."})
        }
        */
        var formid = req.params.formId;
        formModel.findFormById(formid)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function deleteFormById(req, res) {
        /*
        var formid = req.params.formId;

        var deleted = formModel.deleteFormById(formid);
        if (deleted) {
           res.send(200)
        }
        else {
            res.json({message:"Form not found."});
        }
        */
        var formid = req.params.formId;
        formModel.deleteFormById(formid)
            .then(
                function (doc) {
                    res.status(200).send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFormForUser(req, res) {
        /*
        var userid = req.params.userId;
        var form = req.body;
        var newForm = formModel.createFormForUser(userid, form);
        if (newForm) {
            res.json(newForm);
            res.send(200);
        }
        else {
            res.json({message:"Cannot create"});
        }
        */
        var userid = req.params.userId;
        var form = req.body;
        formModel.createFormForUser(userid, form)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormById(req, res) {
        /*
        var formid = req.params.formId;
        var form = req.body;
        var newForm = formModel.updateFormById(formid, form);
        if (newForm) {
            res.json(newForm);
        }
        else {
            res.json("Form not found");
        }
        */
        var formid = req.params.formId;
        var form = req.body;
        formModel.updateFormById(formid, form)
            .then(
                function (doc) {
                    res.status(200).send(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

};