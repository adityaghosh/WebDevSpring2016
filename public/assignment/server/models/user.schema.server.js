"use strict";
module.exports = function (mongoose) {

    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        roles: {type:[String], default: ["student"]},
        phones: [String]
    }, {collection: "formmaker.user"});

    return userSchema;
};