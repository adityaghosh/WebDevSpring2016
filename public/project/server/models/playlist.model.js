"use strict";

var playlists = require("./playlist.mock.json");
var q = require('q');
var uuid = require('node-uuid');
module.exports = function (db, mongoose) {


    var PlaylistSchema = require("./playlist.schema.server.js")(mongoose);
    var PlaylistModel = mongoose.model('Playlist', PlaylistSchema);


    var api = {
        findPlaylistByPlaylistID: findPlaylistByPlaylistID,
        findPlaylistByUserID: findPlaylistByUserID,
        findAllPlaylists: findAllPlaylists,
        createPlaylist: createPlaylist,
        deletePlaylist: deletePlaylist,
        updatePlaylist: updatePlaylist,
        findPlaylistBySoundCloudId: findPlaylistBySoundCloudId,
        updateUserLikesPlaylist: updateUserLikesPlaylist,
        unlikeUser: unlikeUser
    };

    return api;


    function findPlaylistBySoundCloudId (soundcloudid){

        var deferred = q.defer();
        PlaylistModel.findOne(
            {soundCloudId: soundcloudid},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function findPlaylistByPlaylistID(id){

        var deferred = q.defer();

        PlaylistModel.findById(
            id,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function findPlaylistByUserID(userid) {

        var deferred = q.defer();

        PlaylistModel.find(
            {$or :[{createdBy:userid},{likedByUserIds: userid}]},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function updateUserLikesPlaylist(playlistid, userid) {

        var deferred = q.defer();

        PlaylistModel.findOne(
            {_id:playlistid},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    doc.likedByUserIds.push(userid);
                    doc.save(
                        function (err, doc) {
                            if (err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(doc);
                            }
                        }
                    );
                }
            }
        );

        return deferred.promise;
    }

    function unlikeUser(playlistid, userid) {
        var deferred = q.defer();

        PlaylistModel.update(
            {_id:playlistid},
            {$pull:{likedByUserIds:userid}},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function createPlaylist(playlist) {

        var newPlaylist = null;
        if (playlist.id) {
            newPlaylist = new PlaylistModel(
                {
                    playlistName: playlist.title,
                    soundCloudId : playlist.id,
                    uri: playlist.uri
                }
            );
        }
        var deferred = q.defer();
        newPlaylist.save(function (err) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(newPlaylist);
            }
        });

        return deferred.promise;
    }

    function findAllPlaylists() {
        var deferred= q.defer();
        PlaylistModel.find(
            function (doc) {
                deferred.resolve(newPlaylist);
            },
            function (err) {
                deferred.reject(err);
            }
        );
        return deferred.promise;
    }

    function deletePlaylist(playlistid, userid) {

        var deferred = q.defer();
        PlaylistModel.remove(
            {
                _id: playlistid
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function updatePlaylist(playlistid, userid, playlist) {

        var updatedPlaylist = new PlaylistModel(playlist);

        var deferred = q.defer();
        PlaylistModel.findById(playlistid,
            function (err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    doc.playlistName = updatedPlaylist.playlistName;
                    doc.songs = updatedPlaylist.songs;
                    doc.likedByUserIds = updatedPlaylist.likedByUserIds;
                    doc.save(function (err) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(doc);
                        }
                    });
                }
            }
        );
        return deferred.promise;
    }

};