(function () {
    angular
        .module("MusicSocial")
        .factory("SongService", SongService);

    function SongService($http) {

        var $searchuri = "https://api.spotify.com/v1/search?q=SONGNAME&type=track";
        var $getsongsuri = "https://api.spotify.com/v1/tracks/?ids=";

        var api = {
            findSongInSpotify: findSongInSpotify,
            findSongsByIdsInSpotify: findSongsByIdsInSpotify
        };

        return api;

        function findSongInSpotify(songname) {
            var searchQuery = $searchuri.replace("SONGNAME", songname.replace(' ','%20'));
            return $http.get(searchQuery)
        }

        function findSongsByIdsInSpotify(spotifyids) {
            var query = $getsongsuri + spotifyids.toString();
            return $http.get(query);
        }
    }
})();