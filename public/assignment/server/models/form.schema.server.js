"use strict";
module.exports = function (mongoose) {

    var formSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [mongoose.Schema.Types.ObjectId],
        created: Date,
        updated: Date
    }, {collection: "formmaker.form"});

    return formSchema;
};