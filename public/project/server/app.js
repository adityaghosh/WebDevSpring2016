"use strict";

module.exports = function (app) {
    var UserModel = require("./models/user.model.js")();
    var UserService = require("./services/user.service.server")(app, UserModel);

};