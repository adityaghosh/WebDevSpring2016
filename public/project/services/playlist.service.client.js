(function () {
    angular
        .module("MusicSocial")
        .factory("PlaylistService", PlaylistService);

    function PlaylistService($http) {
        var playlists = [
            {"_id":101, "playlistName":"Super Blues", "createdBy":123},
            {"_id":102, "playlistName":"Jazz it all", "createdBy":234},
            {"_id":103, "playlistName":"Rocky Mondays", "createdBy":123},
            {"_id":104, "playlistName":"Greatest Hits", "createdBy":123}
        ];

        //var $searchuri = "https://api.spotify.com/v1/search?q=PLAYLISTNAME&type=playlist";

        var api = {
            findPlaylistByName: findPlaylistByName,
            findPlaylistByPlaylistID: findPlaylistByPlaylistID,
            findPlaylistByUserID: findPlaylistByUserID,
            findAllPlaylists: findAllPlaylists,
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
                    console.log(words[j]);
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

    }
})();