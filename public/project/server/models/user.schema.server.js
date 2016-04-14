"use strict";
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
module.exports = function (mongoose) {

    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        soundCloud: {
            id:String,
            token:String
        },
        likedPlaylistIds: [String],
        roles: {type:[String], default: ["user"]}
    }, {collection: "musicsocial.user"});


    // generating a hash
    userSchema.pre('save', function(next) {
        var user = this;

        // only hash the password if it has been modified (or is new)
        if (!user.isModified('password')) return next();

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);

                // override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });
    });

    // checking if password is valid
    userSchema.methods.comparePassword = function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };

    return userSchema;
};