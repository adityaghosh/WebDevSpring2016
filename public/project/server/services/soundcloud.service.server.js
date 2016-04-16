

module.exports = function (app) {

    var SC = require('node-soundcloud');
    var clientID = '14325a4a3ec62d73a1b51445bab1e644';
    var secret = '298d053f85f90fce4d5f5ba4f66c0316';
    SC.init({
        id: clientID,
        sercret: secret
    });

    app.get("/api/project/soundcloud/tracks", getTracks);
    app.get("/api/project/soundcloud/clientid", getClientId);
    app.get("/api/project/soundcloud/playlist/:sid", getPlaylist);
    app.get("/api/project/soundcloud/playlists", getPlaylists);


    var page_size = 50;

    function getTracks(req, res) {
        var query = req.query.trackname;
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
        SC.get('/playlists',{q:query, limit: page_size},
            function (err, playlists) {
                if (err) {
                    res.status(400).send();
                }
                else {
                    //Removing all playlists that have 0 tracks.
                    for (var i in playlists) {
                        if (!(playlists[i].tracks.length > 1)) {
                            playlists.splice(i,1);
                        }
                    }
                    for (var i in playlists) {
                        if (!(playlists[i].tracks.length > 1)) {
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

};
