(function () {
    angular
        .module("MusicSocial")
        .factory("PlaylistService", PlaylistService);

    function PlaylistService($http) {
        var playlists = [
            {"_id":101, "playlistName":"Super Blues", "createdBy":123, songs:[{"_id":1, "spotify_id":"3AJwUDP919kvQ9QcozQPxg", "name":"Yellow"}]},
            {"_id":102, "playlistName":"Jazz it all", "createdBy":234, songs:[{"_id":3, "spotify_id":"3AJwUDP919kvQ9QcozQPxg", "name":"Yellow"}]},
            {"_id":103, "playlistName":"Rocky Mondays", "createdBy":123, songs:[{"_id":4, "spotify_id":"3AJwUDP919kvQ9QcozQPxg", "name":"Yellow"}]},
            {"_id":104, "playlistName":"Greatest Hits", "createdBy":123, songs:[{"_id":2, "spotify_id":"3AJwUDP919kvQ9QcozQPxg", "name":"Yellow"}]}
        ];

        //var $searchuri = "https://api.spotify.com/v1/search?q=PLAYLISTNAME&type=playlist";

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

        function findPlaylistByName(playlistName, callback){
            var result = [];
            playlistName = playlistName.toUpperCase();
            for (var i=0 ; i < playlists.length; i++) {
                var words = playlistName.split(" ");
                for (var j=0; j<words.length; j++){
                    //console.log(words[j]);
                    if (playlists[i].playlistName.toUpperCase().indexOf(words[j]) > 0) {
                        result.push(playlists[i]);
                    }
                }

            }
            callback(result);
            //var searchQuery = $searchuri.replace("PLAYLISTNAME", playlistName.replace(' ','%20'));
            //$http.get(searchQuery)
                //.success(callback);
        }

        function findPlaylistByPlaylistID(playlist, callback){
            var result = null;
            for(var i = 0; i<playlists.length; i++) {
                if(playlists[i]._id == playlist._id) {
                    result = playlists[i];
                }
            }
            callback(result);
        }

        function findPlaylistByUserID(userid, callback) {
            var results = [];
            for (var i = 0; i<playlists.length; i++){
                if(playlists[i].createdBy == userid){
                    results.push(playlists[i]);
                }
            }
            callback(results);
        }

        function findSongsInPlaylist(playlist, songname, callback){
            var results = [];
            var playlistLocal = null;
            findPlaylistByPlaylistID(playlist, function(response){
                playlistLocal = response;
            });
            if (playlistLocal) {
                var songs = playlistLocal.songs;
                for (var i=0; i<songs.length; i++){
                    if(songs[i].name == songname){
                        results.push(songs[i]);
                    }
                }
            }
            callback(results);
        }

        function createPlaylist(userid, playlist, callback) {
            var newPlaylist = {
                "id":(new Date).getTime(),
                "playlistName": playlist.playlistName,
                "createdBy": userid
            };
            playlists.push(newPlaylist);
            callback(newPlaylist);
        }
        function findAllPlaylists(callback) {
            callback(playlists);
        }
        function deletePlaylist(playlistid, callback) {
            var found = false;
            for(var i = 0; i<playlists.length; i++) {
                if (playlists[i]._id == playlistid){
                    playlists.splice(i,1);
                    found = true;
                    break;
                }
            }
            callback(found);
        }
        function updatePlaylist(playlist, callback) {
            for(var i=0; i<playlists.length; i++){
                if (playlists[i]._id == playlist._id){
                    playlists[i].playlistName = playlist.playlistName;
                    break;
                }
            }
            callback(playlists[i]);
        }

        function addSongToPlaylist(playlist, song, callback) {
            for(var i=0; i<playlists.length; i++) {
                if (playlists[i]._id == playlist._id) {
                    playlists[i].songs.push(song);
                    break;
                }
            }
            callback(playlists[i]);
        }
        function removeSongFromPlaylist(playlist, song, callback) {
            var i = 0;
            for(i=0; i<playlists.length; i++) {
                if (playlists[i]._id == playlist._id) {
                    for(var j=0; j<playlists[i].songs.length; j++) {
                        if (playlists[i].songs[j]._id == song._id) {
                            playlists[i].songs.splice(j,1);
                            callback(playlists[i]);
                        }
                    }
                }
            }
        }
    }
})();