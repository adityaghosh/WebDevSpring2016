//"use strict";

var playlists = require("./playlist.mock.json");
var uuid = require('node-uuid');
module.exports = function () {

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
        updatePlaylist: updatePlaylist
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

    function findPlaylistByPlaylistID(id){
        var result = false;
        for(var i = 0; i<playlists.length ; i++) {
            if(playlists[i]._id == id) {
                result = playlists[i];
            }
        }
        return result;
    }

    function findPlaylistByUserID(userid) {
        var results = [];
        for (var i = 0; i<playlists.length; i++){
            if(playlists[i].createdBy == userid){
                results.push(playlists[i]);
            }
        }
        return results;
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

    function createPlaylist(userid, playlist) {
        var newPlaylist = {
            "_id":uuid.v1(),
            "playlistName": playlist.playlistName,
            "createdBy": userid,
            "songs":[]
        };
        playlists.push(newPlaylist);
        return newPlaylist;
    }

    function findAllPlaylists() {
        return playlists;
    }

    function deletePlaylist(playlistid, userid) {
        var found = false;
        for(var i = 0; i<playlists.length; i++) {
            if (playlists[i]._id == playlistid && playlists[i].createdBy == userid){
                playlists.splice(i,1);
                found = true;
                break;
            }
        }
        return found;
    }

    function updatePlaylist(playlistid, userid, playlist) {
        for(var i=0; i<playlists.length; i++){
            if (playlists[i]._id == playlistid){
                if (playlists[i].createdBy == userid) {
                    playlists[i].playlistName = playlist.playlistName;
                    return playlists[i];
                }
            }
        }
        return false;
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