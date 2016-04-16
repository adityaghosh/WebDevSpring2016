(function () {
    angular
        .module("MusicSocial")
        .controller("PlaylistController", PlaylistController);

    function PlaylistController($scope, $rootScope, $location, PlaylistService) {
        $scope.addPlaylist = addPlaylist;
        $scope.updatePlaylist = updatePlaylist;
        $scope.deletePlaylist = deletePlaylist;
        $scope.viewPlaylistDetails = viewPlaylistDetails;
        $scope.selectedPlaylist = null;
        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.playPlaylist = playPlaylist;
        $scope.nextPage = nextPage;
        $scope.prevPage = prevPage;

        updatePlaylistList();

        var selectedPlaylist = null;

        function nextPage() {
            if($scope.currentPage < $scope.numberOfPages - 1) {
                $scope.currentPage = $scope.currentPage + 1;
            }
        }

        function prevPage() {
            if($scope.currentPage > 0) {
                $scope.currentPage = $scope.currentPage - 1;
            }
        }

        function updatePlaylistList() {
            PlaylistService.findPlaylistByUserID($rootScope.user._id)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            $scope.selectedPlaylist = null;
                            $scope.playlists = response.data;
                            $scope.numberOfPages= $scope.playlists.length/$scope.pageSize;
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
                        }
                    }
                );
        }

        function updatePlaylist(playlistname) {
            if(selectedPlaylist) {
                selectedPlaylist.playlistName = playlistname;
                console.log(playlistname);
                console.log(selectedPlaylist);
                PlaylistService.updatePlaylist(selectedPlaylist._id, $rootScope.user._id, selectedPlaylist)
                    .then(
                        function (response) {
                            if(response.data != "null") {
                                updatePlaylistList();
                            }
                        }
                    );
            }
        }

        function deletePlaylist(playlist) {
            PlaylistService.unlikePlaylist(playlist._id, $rootScope.user._id)
                .then(
                    function (response) {
                        updatePlaylistList();
                    }
                );
        }

        function viewPlaylistDetails(playlist) {
            //PlaylistService.setCurrentlyPlaying(playlist);
            $location.url("/viewplaylist/"+playlist._id);
        }
        function playPlaylist(playlist) {
            PlaylistService.setCurrentlyPlaying(playlist);
        }
    }
})();