(function () {
    angular
        .module("MusicSocial")
        .factory("SongService", SongService);

    function SongService($http, PlaylistService) {

        var $searchuri = "https://api.spotify.com/v1/search?q=SONGNAME&type=track";
        var $getsongsuri = "https://api.spotify.com/v1/tracks/?ids=";

        var api = {
            findSongInSpotify: findSongInSpotify,
            findSongsByIdsInSpotify: findSongsByIdsInSpotify
        };

        return api;

        function findSongInSpotify(songname, callback) {
            var searchQuery = $searchuri.replace("SONGNAME", songname.replace(' ','%20'));
            $http.get(searchQuery)
                .success(callback);
        }

        function findSongsByIdsInSpotify(spotifyids, callback) {
            var query = $getsongsuri + spotifyids.toString();
            $http.get(query)
                .success(callback);
        }
    }
})();