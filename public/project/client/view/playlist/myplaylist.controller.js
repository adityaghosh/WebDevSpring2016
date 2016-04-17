(function () {
    angular
        .module("MusicSocial")
        .controller("PlaylistController", PlaylistController);

    function PlaylistController($scope, $rootScope, $location, PlaylistService) {
        $scope.deletePlaylist = deletePlaylist;
        $scope.viewPlaylistDetails = viewPlaylistDetails;
        $scope.selectedPlaylist = null;
        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.playPlaylist = playPlaylist;
        $scope.nextPage = nextPage;
        $scope.prevPage = prevPage;
        $scope.playlists = []

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
                            $scope.playlists = response.data;
                            $scope.numberOfPages= Math.ceil($scope.playlists.length/$scope.pageSize);
                        }
                    }
                );
        }

        function deletePlaylist(playlist) {
            PlaylistService
                .unlikePlaylist(playlist._id, $rootScope.user._id)
                .then(
                    function (response) {
                        if (response.data) {
                            updatePlaylistList();
                        }
                    }
                );
        }

        function viewPlaylistDetails(playlist) {
            $location.url("/viewplaylist/"+playlist._id);
        }
        function playPlaylist(playlist) {
            PlaylistService.setCurrentlyPlaying(playlist);
        }
    }
})();