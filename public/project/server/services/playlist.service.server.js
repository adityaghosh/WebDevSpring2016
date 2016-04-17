"use strict";

module.exports = function (app, model, UserModel) {


    app.get('/api/project/playlist/:playlistid', findPlaylistById);
    app.get('/api/project/playlist', findPlaylists);
    app.get('/api/project/user/:userid/playlist', findPlaylistByUserID);
    app.get('/api/project/playlist/:playlistid/song', findSongsInPlaylist);

    app.get('/api/project/playlist/soundcloudid/:soundcloudid', findPlaylistBySoundCloudId);

    app.post('/api/project/playlist/:playlistid/song', addSongToPlaylist);
    //app.post('/api/project/playlist/getPlayer', getPlayer);
    //app.post('/api/project/user/:userid/playlist', createPlaylist);
    app.post('/api/project/playlist', createPlaylist);
    app.put('/api/project/user/:userid/playlist/:playlistid', updatePlaylist);
    app.put("/api/project/playlist/:playlistid/user/:userid", updateUserLikesPlaylist);
    //app.delete("/api/project/playlist/:playlistid/user/:userid", unlikeUser);

    app.delete('/api/project/user/:userid/playlist/:playlistid', deletePlaylist);
    app.delete('/api/project/playlist/:playlistid/user/:userid', removeUserFromPlaylist);



    function findPlaylistById (req, res) {
        var playlistid = req.params.playlistid;
        model.findPlaylistByPlaylistID(playlistid)
            .then(
                function (doc) {
                    if (doc){
                        res.json(doc);
                    }
                }  ,
                function (err) {
                    res.status(400).send();
                }
            );
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
        model.findPlaylistByUserID(userId)
            .then(
                function (doc) {
                    if (doc){
                        res.json(doc);
                    }
                }  ,
                function (err) {
                    res.status(400).send();
                }
            );

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

    function findPlaylistBySoundCloudId(req, res) {
        var soundCloudId = req.params.soundcloudid;

        model.findPlaylistBySoundCloudId(soundCloudId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send();
                }
            );
    }

    function removeUserFromPlaylist(req, res) {
        var playlistid = req.params.playlistid;
        var userid = req.params.userid;
        model
            .unlikeUser(playlistid,userid)
            .then(
                function (doc) {
                    return UserModel.unlikePlaylist(userid, playlistid);
                },
                function (err) {
                    res.status(400).send();
                }
            )
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send();
                }
            );
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
        //var userId = req.params.userid;
        var playlist = req.body;
        model
            .createPlaylist(playlist)
            .then(
                function (doc) {
                    if (doc){
                        res.json(doc);
                    }
                }  ,
                function (err) {
                    res.status(400).send();
                }
            );
    }

    function updatePlaylist (req, res) {
        var playlistid = req.params.playlistid;
        var userid = req.params.userid;
        var playlist = req.body;

        model
            .updatePlaylist(playlistid, userid, playlist)
            .then(
                function (doc) {
                    if (doc){
                        res.json(doc);
                    }
                }  ,
                function (err) {
                    res.status(400).send();
                }
            );
    }

    function updateUserLikesPlaylist(req, res) {
        var playlistid = req.params.playlistid;
        var userid = req.params.userid;

        model
            .updateUserLikesPlaylist(playlistid, userid)
            .then(
                function (doc) {
                    return UserModel.updateUserLikesPlaylist(userid, playlistid);
                },
                function (err) {
                    res.status(400).send();
                }
            )
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.statusCode(400).send();
                }
            );
    }

    function deletePlaylist (req, res) {
        var playlistid = req.params.playlistid;
        var userid = req.params.userid;

        model
            .deletePlaylist(playlistid)
            .then(
                function (doc) {
                    if (doc){
                        res.send(200);
                    }
                }  ,
                function (err) {
                    res.status(400).send();
                }
            );
    }


    /*function getPlayer(req, res) {
        var playlist = req.body;
        var songs = playlist.songs;
        var spotify_ids = [];
        for (var i in songs) {
            spotify_ids.push(songs[i].spotify_id);
        }
        spotify_ids = spotify_ids.join(",");
        var src = "https://embed.spotify.com/?uri=spotify:trackset:"+playlist.playlistName.replace(" ","")+":"+spotify_ids;
        res.json(src);
    }*/


};