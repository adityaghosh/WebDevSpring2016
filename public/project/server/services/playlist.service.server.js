"use strict";

module.exports = function (app, model) {
    app.get('/api/project/playlist/:playlistid', findPlaylistById);
    app.get('/api/project/playlist', findPlaylists);
    app.get('/api/project/user/:userid/playlist', findPlaylistByUserID);
    app.get('/api/project/playlist/:playlistid/song', findSongsInPlaylist);
    app.post('/api/project/playlist/:playlistid/song', addSongToPlaylist);
    app.post('/api/project/user/:userid/playlist', createPlaylist);
    app.put('/api/project/user/:userid/playlist/:playlistid', updatePlaylist);
    app.delete('/api/project/user/:userid/playlist/:playlistid', deletePlaylist);
    app.delete('/api/project/playlist/:playlistid/song/:songid', removeSongFromPlaylist);


    function findPlaylistById (req, res) {
        var playlistid = req.params.playlistid;
        var playlists = model.findPlaylistByPlaylistID(playlistid);
        if (playlists) {
            res.json(playlists);
        }
        else {
            res.json({"message":"PlaylistID not found."});
        }
    }

    function findPlaylists (req, res) {
        var queryName = req.query.playlistname;
        var playlists = null;
        if (queryName) {
            playlists = model.findPlaylistByName(queryName);
            res.json(playlists);
        }
        else{
            playlists = model.findAllPlaylists();
            res.json(playlists);
        }

    }

    function findPlaylistByUserID (req, res) {
        var userId = req.params.userid;
        var playlists = model.findPlaylistByUserID(userId);
        res.json(playlists);
    }

    function findSongsInPlaylist (req, res) {
        var playlistid = req.params.playlistid;
        var songname = req.query.song;
        if (songname) {
            var songs = model.findSongsInPlaylist(playlistid, songname);
            res.json(songs);
        }
        else {
            res.json({"message":"No songname given."});
        }
    }

    function addSongToPlaylist (req, res) {
        var playlistid = req.params.playlistid;
        var song = req.body;
        var newPlaylist = model.addSongToPlaylist(playlistid, song);
        if (newPlaylist) {
            res.json(newPlaylist);
            res.send(200);
        }
        else {
            res.json({"message":"Invalid playlistID."});
        }
    }

    function createPlaylist (req, res) {
        var userId = req.params.userid;
        var playlist = req.body;
        var newPlaylist = model.createPlaylist(userId, playlist);
        res.json(newPlaylist);
        res.send(200);
    }

    function updatePlaylist (req, res) {
        var playlistid = req.params.playlistid;
        var userid = req.params.userid;
        var playlist = req.body;
        var newPlaylist = model.updatePlaylist(playlistid, userid, playlist);
        if (newPlaylist) {
            res.json(newPlaylist);
        }
        else {
            res.json({"message":"No access to update."});
        }
    }

    function deletePlaylist (req, res) {
        var playlistid = req.params.playlistid;
        var userid = req.params.userid;
        var found = model.deletePlaylist(playlistid, userid);
        if (found) {
            res.send(200);
        }
        else {
            res.json({"message":"Playlist Not found. Or you do not have access to delete."})
        }
    }

    function removeSongFromPlaylist (req, res) {
        var playlistid = req.params.playlistid;
        var songid = req.params.songid;
        var newPlaylist = model.removeSongFromPlaylist(playlistid, songid);
        res.json(newPlaylist);
    }

};