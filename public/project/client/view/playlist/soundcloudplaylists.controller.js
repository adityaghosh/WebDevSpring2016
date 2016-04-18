(function () {
    angular
        .module("MusicSocial")
        .controller("SoundCloudPlaylistController", SoundCloudPlaylistController);

    function SoundCloudPlaylistController($scope, $rootScope, $location, SoundCloudService, PlaylistService){
        $scope.playlists = [];
        $scope.play = play;
        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.nextPage = nextPage;
        $scope.prevPage = prevPage;
        $scope.viewPlaylistDetails = viewPlaylistDetails;
        $scope.nosongs = false;


        function init() {
            if($rootScope.user) {
                SoundCloudService.getSoundCloudPlaylists($rootScope.user._id)
                    .then(
                        function (response) {
                            console.log(response);
                            if (response.data != "null") {
                                $scope.playlists = response.data;
                                $scope.numberOfPages= $scope.playlists.length/$scope.pageSize;
                                if ($scope.playlists.length == 0) {
                                    $scope.nosongs = true;
                                }
                            }
                            else {
                                $scope.playlists = [];
                            }
                        }
                    );

            }
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

        function play(playlist) {
            PlaylistService
                .findPlaylistBySoundCloudID(playlist.id)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            PlaylistService.setCurrentlyPlaying(response.data);
                        }
                        else {
                            PlaylistService.createPlaylist(playlist)
                                .then(
                                    function (response) {
                                        if (response.data) {
                                            PlaylistService.setCurrentlyPlaying(response.data);
                                        }
                                    }
                                );
                        }
                    }
                );
        }

        function viewPlaylistDetails(playlist) {
            PlaylistService
                .findPlaylistBySoundCloudID(playlist.id)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            $location.url("/viewplaylist/"+response.data._id);
                        }
                        else {
                            PlaylistService.createPlaylist(playlist)
                                .then(
                                    function (response) {
                                        if (response.data) {
                                            $location.url("/viewplaylist/"+response.data._id);
                                        }
                                    }
                                );
                        }
                    });
        }
    }
})();