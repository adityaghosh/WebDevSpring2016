"use strict";

module.exports = function (app, db, mongoose, UserModel) {

    var UserService = require("./services/user.service.server")(app, UserModel);

    var PlaylistModel = require("./models/playlist.model.js")(db, mongoose);
    var PlaylistService = require("./services/playlist.service.server")(app, PlaylistModel, UserModel);
    var SoundCloudService = require("./services/soundcloud.service.server")(app, UserModel);
};