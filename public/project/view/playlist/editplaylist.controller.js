(function () {
    angular
        .module("MusicSocial")
        .controller("EditPlaylistController", EditPlaylistController);

    function EditPlaylistController($scope, $rootScope, SongService, PlaylistService){
        $scope.addTab = true;
        $scope.removeTab = false;
        $scope.playlist = $rootScope.currentPlaylist;
        $scope.addTabClick = addTabClick;
        $scope.removeTabClick = removeTabClick;
        $scope.searchSong = searchSong;
        $scope.addSong = addSong;
        $scope.removeSong = removeSong;

        function addTabClick() {
            if (!$scope.addTab){
                $scope.addTab = true;
                $scope.removeTab = false;
                $scope.songs = null;
            }
        }
        function removeTabClick() {
            if (!$scope.removeTab) {
                $scope.removeTab = true;
                $scope.addTab = false;
                $scope.songname = "";
                fillSongsInPlaylist();
            }
        }

        function searchSong(songname) {
            if ($scope.addTab) {
                SongService.findSongInSpotify(songname, function(response) {
                    $scope.songs = response.tracks;
                });
            }
            else {
             //autocomplete code here.
            }
        }

        function addSong(song) {
            var s = {"_id": (new Date).getTime(), "spotify_id": song.id, "name":song.name};
            PlaylistService.addSongToPlaylist($scope.playlist, s, function (response) {
                $scope.playlist = response;
                $rootScope.currentPlaylist = response;
            });
        }

        function removeSong($index) {
            var song = $scope.playlist.songs[$index];
            PlaylistService.removeSongFromPlaylist($scope.playlist, song, function (response) {
                $scope.playlist = response;
                $rootScope.currentPlaylist = response;
            });
            fillSongsInPlaylist();
        }

        /*
        * Helper Function to fill songs details.
        */
        function fillSongsInPlaylist () {
            var s = $scope.playlist.songs;
            var sp_ids = [];
            for(var i=0; i< s.length; i++){
                sp_ids.push(s[i].spotify_id);
            }
            SongService.findSongsByIdsInSpotify(sp_ids, function (response) {
                response.tracks.items = response.tracks;
                $scope.songs = response.tracks;
            });
        }
    }

})();