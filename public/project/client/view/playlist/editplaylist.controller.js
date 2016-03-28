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
                SongService.findSongInSpotify(songname)
                    .then(
                        function(response) {
                            if (response.data != "null") {
                                $scope.songs = response.data.tracks;
                            }
                        }
                    );
            }
            else {
             //autocomplete code here.
            }
        }

        function addSong(song) {
            var s = {"spotify_id": song.id, "name":song.name};
            PlaylistService.addSongToPlaylist($scope.playlist._id, s)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            $scope.playlist = response.data;
                            PlaylistService.setCurrentlyPlaying(response.data);
                        }
                    }
                );
        }

        function removeSong($index) {
            var song = $scope.playlist.songs[$index];
            PlaylistService.removeSongFromPlaylist($scope.playlist._id, song._id)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            $scope.playlist = response.data;
                            PlaylistService.setCurrentlyPlaying(response.data);
                            fillSongsInPlaylist();
                        }
                    }
                );
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
            if (sp_ids.length > 0) {
                SongService.findSongsByIdsInSpotify(sp_ids)
                    .then(
                        function (response) {
                            console.log(response);
                            if (response.data != "null") {
                                response.data.tracks.items = response.data.tracks;
                                $scope.songs = response.data.tracks;
                            }
                        }
                    );
            }
        }
    }

})();