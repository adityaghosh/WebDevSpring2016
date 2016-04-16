"use strict";

module.exports = function (app, db, mongoose) {
    var UserModel = require("./models/user.model.js")(db, mongoose);
    var UserService = require("./services/user.service.server")(app, UserModel);

    var PlaylistModel = require("./models/playlist.model.js")(db, mongoose);
    var PlaylistService = require("./services/playlist.service.server")(app, PlaylistModel);
    var SoundCloudService = require("./services/soundcloud.service.server")(app);
};