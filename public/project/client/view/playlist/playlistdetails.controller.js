(function () {
    angular
        .module("MusicSocial")
        .controller("PlaylistDetailController", PlaylistDetailController);

    function PlaylistDetailController($scope, $routeParams,  SoundCloudService, PlaylistService) {

        $scope.songs = [];
        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.nextPage = nextPage;
        $scope.prevPage = prevPage;
        $scope.playPlaylist = playPlaylist;


        function init() {
            var playlistId = $routeParams.playlistid;
            var tracks = [];
            PlaylistService
                .findPlaylistByPlaylistID(playlistId)
                .then(
                    function (response) {
                        if(response.data) {
                            $scope.playlist = response.data;
                            console.log(response.data);
                            SoundCloudService.getPlaylistByPlaylistId($scope.playlist.soundCloudId)
                                .then(
                                    function (response) {
                                        if (response.data != "null") {
                                            console.log(response.data);
                                            $scope.songs = response.data.tracks;
                                            $scope.numberOfPages= $scope.songs.length/$scope.pageSize;
                                        }
                                    }
                                );
                        }
                    }
                );

        }
        init();
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
        function playPlaylist(playlist) {
            PlaylistService.setCurrentlyPlaying(playlist);
        }
    }
})();