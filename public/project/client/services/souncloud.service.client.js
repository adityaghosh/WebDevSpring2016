(function () {
    angular
        .module("MusicSocial")
        .factory("SoundCloudService", SoundCloudService);

    function SoundCloudService ($http) {
        var api = {
            getTracks: getTracks,
            getClientID: getClientID,
            getPlaylists: getPlaylists,
            getPlaylistByPlaylistId: getPlaylistByPlaylistId
        };

        return api;

        function getTracks(query) {
            return $http.get("/api/project/soundcloud/tracks?trackname="+query);
        }

        function getPlaylists(query) {
            return $http.get("/api/project/soundcloud/playlists?playlistname="+query);
        }

        function getClientID() {
            return $http.get("/api/project/soundcloud/clientid");
        }

        function getPlaylistByPlaylistId(soundcloudid) {
            return $http.get("/api/project/soundcloud/playlist/"+soundcloudid);
        }

    }

})();
