var SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
var SOUNDCLOUD_CLIENT_SECRET = process.env.SOUNDCLOUD_CLIENT_SECRET;
var SOUNDCLOUD_REDIRECT_URL = process.env.SOUNDCLOUD_REDIRECT_URL;

module.exports = function (app, UserModel) {

    var clientID = SOUNDCLOUD_CLIENT_ID;
    var secret = SOUNDCLOUD_CLIENT_SECRET;
    var redirectUri = SOUNDCLOUD_REDIRECT_URL;

    app.get("/api/project/soundcloud/tracks", getTracks);
    app.get("/api/project/soundcloud/clientid", getClientId);
    app.get("/api/project/soundcloud/playlist/:sid", getPlaylist);
    app.get("/api/project/soundcloud/playlists", getPlaylists);
    app.get("/api/project/soundcloud/user/:userid/playlists", getSouncloudPlaylists);


    var page_size = 50;

    function initializeSoundCloud(token) {
        var SC = require('node-soundcloud');
        if (token){
            SC.init({
                id: clientID,
                sercret: secret,
                uri:redirectUri,
                accessToken: token
            });
        }
        else {
            SC.init({
                id: clientID,
                sercret: secret,
                uri: redirectUri
            });
        }
        return SC;
    }

    function getTracks(req, res) {
        var query = req.query.trackname;
        var SC = initializeSoundCloud();
        SC.get('/tracks',{q:query, limit: page_size},
            function (err, tracks) {
                if (err) {
                    res.status(400).send();
                }
                else {
                    res.json(tracks);
                }
            }
        );
    }

    function getPlaylists(req, res) {
        var query = req.query.playlistname;
        var SC = initializeSoundCloud();
        SC.get('/playlists',{q:query, limit: page_size},
            function (err, playlists) {
                if (err) {
                    res.status(400).send();
                }
                else {
                    //Removing all playlists that have 0 tracks.
                    for (var i in playlists) {
                        if (!(playlists[i].tracks.length > 0)) {
                            playlists.splice(i,1);
                        }
                    }
                    for (var i in playlists) {
                        if (!(playlists[i].tracks.length > 0)) {
                            playlists.splice(i,1);
                        }
                    }
                    res.json(playlists);
                }
            }
        );
    }

    function getClientId(req, res) {
        res.json(clientID);
    }

    function getPlaylist(req, res) {
        var SC = initializeSoundCloud();
        var soundcloudid = req.params.sid;
        SC.get('/playlists/'+soundcloudid,
            function (err, playlist) {
                if (err) {
                    res.status(400).send();
                }
                else {
                    res.json(playlist);
                }
            }
        );
    }

    function getSouncloudPlaylists(req, res) {
        var userid= req.params.userid;
        UserModel.findUserById(userid)
            .then(
                function (user) {
                    var SC= initializeSoundCloud(user.soundCloud.token);
                    //Removing all playlists that have 0 tracks.
                    SC.get('/me/playlists', function (err, playlists) {
                        for (var i in playlists) {
                            if (!(playlists[i].tracks.length > 0)) {
                                playlists.splice(i,1);
                            }
                        }
                        for (var i in playlists) {
                            if (!(playlists[i].tracks.length > 0)) {
                                playlists.splice(i,1);
                            }
                        }
                        res.json(playlists);
                    });
                },
                function (err) {

                }
            );
    }

};
