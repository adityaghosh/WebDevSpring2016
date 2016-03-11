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

        var selectedPlaylist = null;

        var user = $rootScope.user;
        PlaylistService.findPlaylistByUserID(user._id, function (response) {
            $scope.playlists = response;
        });


        function addPlaylist(playlistName){
            var newPlaylist = {"playlistName": playlistName};
            PlaylistService.createPlaylist(user._id, newPlaylist, function (response) {
                $scope.playlists.push(response);
                $scope.playlistName = "";
            });
        }

        function updatePlaylist() {
            if(selectedPlaylist) {
                selectedPlaylist.playlistName = $scope.playlistName;
                PlaylistService.updateFormById(selectedForm._id, selectedForm, function (response) {
                    $scope.playlistName = "";
                });
            }
        }
        function deletePlaylist(index) {
            PlaylistService.deletePlaylist($scope.playlists[index]._id, function (response) {
                $scope.playlists.splice(index,1);
                //$scope.playlists = response;
            });
        }
        function selectPlaylist(index) {
            $scope.playlistName = $scope.playlists[index].playlistName;
            selectedPlaylist = $scope.playlists[index];
        }

        function editPlaylist(playlist) {
            $rootScope.currentPlaylist = playlist;
            $location.url("/editplaylist/"+playlist.playlistName);
        }
    }
})();