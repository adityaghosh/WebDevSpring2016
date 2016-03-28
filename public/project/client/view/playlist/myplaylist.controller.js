(function () {
    angular
        .module("MusicSocial")
        .controller("PlaylistController", PlaylistController);

    function PlaylistController($scope, $rootScope, $location, PlaylistService) {
        $scope.addPlaylist = addPlaylist;
        $scope.updatePlaylist = updatePlaylist;
        $scope.deletePlaylist = deletePlaylist;
        $scope.selectPlaylist = selectPlaylist;
        $scope.editPlaylist = editPlaylist;

        updatePlaylistList();

        var selectedPlaylist = null;

        function updatePlaylistList() {
            PlaylistService.findPlaylistByUserID($rootScope.user._id)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            $scope.playlists = response.data;
                        }
                    }
                );
        }

        function addPlaylist(playlistName){
            var newPlaylist = {"playlistName": playlistName};
            PlaylistService.createPlaylist($rootScope.user._id, newPlaylist)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            updatePlaylistList();
                            $scope.playlistName = "";
                        }
                    }
                );
        }

        function updatePlaylist() {
            if(selectedPlaylist) {
                selectedPlaylist.playlistName = $scope.playlistName;
                PlaylistService.updatePlaylist(selectedPlaylist._id, $rootScope.user._id, selectedPlaylist)
                    .then(
                        function (response) {
                            if(response.data != "null") {
                                $scope.playlistName = "";
                                updatePlaylistList();
                            }
                        }
                    );
            }
        }

        function deletePlaylist(index) {
            PlaylistService.deletePlaylist($scope.playlists[index]._id)
                .then(
                    function (response) {
                        updatePlaylistList();
                    }
                );
        }

        function selectPlaylist(index) {
            $scope.playlistName = $scope.playlists[index].playlistName;
            selectedPlaylist = $scope.playlists[index];
        }

        function editPlaylist(playlist) {
            PlaylistService.setCurrentlyPlaying(playlist);
            $location.url("/editplaylist/"+playlist.playlistName);
        }
    }
})();