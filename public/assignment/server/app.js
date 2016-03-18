module.exports = function (app) {
    var userModel = require('./models/user.model.js')();
    var userService = require('./services/user.service.server.js')(app, userModel);

    var formModel = require('./models/form.model')();
    var formService = require('./services/form.service.server')(app, formModel);
    var fieldService = require('./services/field.service.server')(app, formModel);
};