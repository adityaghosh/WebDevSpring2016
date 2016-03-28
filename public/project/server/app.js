"use strict";

module.exports = function (app) {
    var UserModel = require("./models/user.model.js")();
    var UserService = require("./services/user.service.server")(app, UserModel);

    var PlaylistModel = require("./models/playlist.model.js")();
    var PlaylistService = require("./services/playlist.service.server")(app, PlaylistModel);
};