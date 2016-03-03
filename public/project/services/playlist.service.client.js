(function () {
    angular
        .module("MusicSocial")
        .factory("PlaylistService", PlaylistService);

    function PlaylistService() {
        var api = {
            findPlaylistByName: findPlaylistByName,
            findPlaylistByPlaylistID: findPlaylistByPlaylistID,
            findAllPlaylists: findAllPlaylists,
            createPlaylist: createPlaylist,
            deletePlaylist: deletePlaylist,
            updatePlaylist: updatePlaylist
        };

        return api;

        function findPlaylistByName(){

        }

        function findPlaylistByPlaylistID(){

        }

        function createPlaylist() {

        }
        function findAllPlaylists() {

        }
        function deletePlaylist() {

        }
        function updatePlaylist() {

        }

    }
})();