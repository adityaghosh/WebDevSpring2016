"use strict";
module.exports = function (mongoose) {

    var fieldSchema = mongoose.Schema({
        label: String,
        type: String,
        placeholder: String,
        options: [{label:String, value:String}]
    }, {collection: "formmaker.field"});

    return fieldSchema;
};