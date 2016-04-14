(function () {
    angular
        .module("MusicSocial")
        .factory("SoundCloudService", SoundCloudService);

    function SoundCloudService ($http) {
        var api = {
            getTracks: getTracks,
            getClientID: getClientID,
            getPlaylists: getPlaylists
        };

        return api;

        function getTracks(query) {
            return $http.get("/api/soundcloud/tracks?trackname="+query);
        }

        function getPlaylists(query) {
            return $http.get("/api/soundcloud/playlists?playlistname="+query);
        }

        function getClientID() {
            return $http.get("/api/soundcloud/clientid");
        }
    }

})();
