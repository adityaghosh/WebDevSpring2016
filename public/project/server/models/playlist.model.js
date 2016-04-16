"use strict";

var playlists = require("./playlist.mock.json");
var q = require('q');
var uuid = require('node-uuid');
module.exports = function (db, mongoose) {


    var PlaylistSchema = require("./playlist.schema.server.js")(mongoose);

    var PlaylistModel = mongoose.model('Playlist', PlaylistSchema);

    var SC = require('node-soundcloud');
    var clientID = '14325a4a3ec62d73a1b51445bab1e644';
    var secret = '298d053f85f90fce4d5f5ba4f66c0316';
    SC.init({
        id: clientID,
        sercret: secret
    });

    var api = {
        findPlaylistByName: findPlaylistByName,
        findPlaylistByPlaylistID: findPlaylistByPlaylistID,
        findPlaylistByUserID: findPlaylistByUserID,
        findAllPlaylists: findAllPlaylists,
        findSongsInPlaylist: findSongsInPlaylist,
        addSongToPlaylist: addSongToPlaylist,
        removeSongFromPlaylist: removeSongFromPlaylist,
        createPlaylist: createPlaylist,
        deletePlaylist: deletePlaylist,
        updatePlaylist: updatePlaylist,
        findPlaylistBySoundCloudId: findPlaylistBySoundCloudId,
        updateUserLikesPlaylist: updateUserLikesPlaylist,
        unlikeUser: unlikeUser

    };

    return api;

    function findPlaylistByName(playlistName){
        var result = [];
        var regex = new RegExp(playlistName,"i");
        for (var i=0 ; i < playlists.length; i++) {
            var match = playlists[i].playlistName.search(regex);
            if (match >= 0){
                result.push(playlists[i]);
            }
        }
        return result;
        //var searchQuery = $searchuri.replace("PLAYLISTNAME", playlistName.replace(' ','%20'));
        //$http.get(searchQuery)
        //.success(callback);
    }


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

        /*var result = false;
        for(var i = 0; i<playlists.length ; i++) {
            if(playlists[i]._id == id) {
                result = playlists[i];
            }
        }
        return result;*/
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
        /*var results = [];
        for (var i = 0; i<playlists.length; i++){
            if(playlists[i].createdBy == userid){
                results.push(playlists[i]);
            }
        }
        return results;*/
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

    function findSongsInPlaylist(playlistid, song_name){
        var results = [];
        var playlistLocal = findPlaylistByPlaylistID(playlistid);
        if (playlistLocal) {
            var songs = playlistLocal.songs;
            for (var i=0; i < songs.length ; i++){
                if(songs[i].name.toLowerCase() == song_name.toLowerCase()){
                    results.push(songs[i]);
                }
            }
        }
        return results;
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
        /*else {
            newPlaylist = new PlaylistModel({
                playlistName: playlist.playlistName,
                createdBy: userid
            });
        }*/
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
        /*var newPlaylist = {
            "playlistName": playlist.playlistName,
            "createdBy": userid,
            "songs":[]
        };
        playlists.push(newPlaylist);
        return newPlaylist;*/
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
        //return playlists;
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

        /*var found = false;
        for(var i = 0; i<playlists.length; i++) {
            if (playlists[i]._id == playlistid && playlists[i].createdBy == userid){
                playlists.splice(i,1);
                found = true;
                break;
            }
        }
        return found;*/
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

        /*for(var i=0; i<playlists.length; i++){
            if (playlists[i]._id == playlistid){
                if (playlists[i].createdBy == userid) {
                    playlists[i].playlistName = playlist.playlistName;
                    return playlists[i];
                }
            }
        }
        return false;*/
    }

    function addSongToPlaylist(playlistid, song) {
        var newSong = {
            "_id": uuid.v1(),
            "name": song.name,
            "spotify_id": song.spotify_id
        };
        for(var i=0; i<playlists.length; i++) {
            if (playlists[i]._id == playlistid) {
                playlists[i].songs.push(newSong);
                return playlists[i];
            }
        }
        return null;
    }

    function removeSongFromPlaylist(playlistid, songid) {
        var i = 0;
        for(i=0; i<playlists.length; i++) {
            if (playlists[i]._id == playlistid) {
                for(var j=0; j<playlists[i].songs.length; j++) {
                    if (playlists[i].songs[j]._id == songid) {
                        playlists[i].songs.splice(j,1);
                        return playlists[i];
                    }
                }
            }
        }
    }

};