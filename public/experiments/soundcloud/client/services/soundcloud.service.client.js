(function () {
    angular
        .module("mySoundCloud")
        .factory("SoundCloudService", SoundCloudService);

    function SoundCloudService ($http) {
        var api = {
            getTracks: getTracks,
            getClientID: getClientID
        };

        return api;

        function getTracks(query) {
            return $http.get("/api/soundcloud/tracks?trackname="+query);
        }

        function getClientID() {
            return $http.get("/api/soundcloud/clientid");
        }
    }

})();
