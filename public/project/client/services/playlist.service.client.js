(function () {
    angular
        .module("MusicSocial")
        .factory("PlaylistService", PlaylistService);

    function PlaylistService($http, $rootScope) {

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
            setCurrentlyPlaying: setCurrentlyPlaying,
            createPlayerWidget: createPlayerWidget
        };

        return api;

        function findPlaylistByName(playlistName){
            return $http.get("/api/project/playlist?playlistname="+playlistName);
        }

        function findPlaylistByPlaylistID(playlistid){
            return $http.get("/api/project/playlist/"+playlistid);
        }

        function findPlaylistByUserID(userid) {
            return $http.get("/api/project/user/"+userid+"/playlist");
        }

        function findSongsInPlaylist(playlistid, songname){
            return $http.get("/api/project/playlist/"+playlistid+"/song?song="+songname);
        }

        function createPlaylist(userid, playlist) {
            return $http.post("/api/project/user/"+userid+"/playlist", playlist);
        }

        function findAllPlaylists() {
            return $http.get("/api/project/playlist");
        }

        function deletePlaylist(playlistid) {
            return $http.delete("/api/project/user/"+$rootScope.user._id+"/playlist/"+playlistid);
        }

        function updatePlaylist(playlistid, userid, playlist) {
            return $http.put("/api/project/user/"+userid+"/playlist/"+playlistid, playlist);
        }

        function addSongToPlaylist(playlistid, song) {
            return $http.post("/api/project/playlist/"+playlistid+"/song", song);
        }

        function removeSongFromPlaylist(playlistid, songid) {
            return $http.delete("/api/project/playlist/"+playlistid+"/song/"+songid);
        }

        function setCurrentlyPlaying (playlist) {
            $rootScope.currentPlaylist = playlist;
        }

        function createPlayerWidget(playlist) {
            return $http.post("/api/project/playlist/getPlayer", playlist);
        }
    }
})();