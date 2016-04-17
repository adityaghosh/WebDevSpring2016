"use strict";
module.exports = function (app, db, mongoose, userModel) {

    var userService = require('./services/user.service.server.js')(app, userModel);

    var formModel = require('./models/form.model.server.js')(db, mongoose);
    var formService = require('./services/form.service.server')(app, formModel);

    var fieldModel = require('./models/field.model.server')(db, mongoose, formModel);
    var fieldService = require('./services/field.service.server')(app, formModel, fieldModel);
};