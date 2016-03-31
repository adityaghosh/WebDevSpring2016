"use strict";
module.exports = function (mongoose) {

    var fieldSchema = require('./field.schema.server')(mongoose);

    var formSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [fieldSchema],
        created: {type: Date, default: Date.now},
        updated: Date
    }, {collection: "formmaker.form"});

    return formSchema;
};