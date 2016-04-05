"use strict";
module.exports = function (app) {
    var ChatModel = require("./models/chatroom.model.server.js")();
    var ChatService = require("./services/chatroom.service.server.js")(app, ChatModel);
};