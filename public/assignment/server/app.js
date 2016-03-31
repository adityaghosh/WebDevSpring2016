"use strict";
module.exports = function (app, db, mongoose) {

    var userModel = require('./models/user.model.js')(db, mongoose);
    var userService = require('./services/user.service.server.js')(app, userModel);

    var formModel = require('./models/form.model')(db, mongoose);
    var formService = require('./services/form.service.server')(app, formModel);
    var fieldService = require('./services/field.service.server')(app, formModel);
};