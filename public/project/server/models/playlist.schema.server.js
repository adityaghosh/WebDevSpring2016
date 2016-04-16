'use strict';

module.exports = function (mongoose) {

    var playlistSchema = mongoose.Schema({
        playlistName: String,
        createdBy: String,
        soundCloudId: String,
        //songs: {type:[String], default:[]},
        uri: String,
        likedByUserIds: {type:[String], default:[]}
    }, {collection: "musicsocial.playlist"});

    return playlistSchema;
};