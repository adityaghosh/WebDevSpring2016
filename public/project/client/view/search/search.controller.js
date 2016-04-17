(function () {
    angular
        .module("MusicSocial")
        .controller("SearchController", SearchController);

    function SearchController($scope, $routeParams, $rootScope, PlaylistService, SoundCloudService) {
        $scope.playlists = [];
        $scope.play = play;
        $scope.addToMyPlaylists = addToMyPlaylists;
        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.nextPage = nextPage;
        $scope.prevPage = prevPage;


        function init() {
            if($routeParams.playlistName) {
                SoundCloudService.getPlaylists($routeParams.playlistName)
                    .then(
                        function (response) {
                            if (response.data != "null") {
                                $scope.playlists = response.data;
                                $scope.numberOfPages= $scope.playlists.length/$scope.pageSize;
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

        function addToMyPlaylists(playlist) {
            PlaylistService
                .findPlaylistBySoundCloudID(playlist.id)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            //Add user to likes
                            var toAdd = true;
                            for (var i in $rootScope.user.likedPlaylistIds) {
                                if (response.data._id == $rootScope.user.likedPlaylistIds[i]) {
                                    toAdd = false;
                                    break;
                                }
                            }
                            if (toAdd){
                                PlaylistService.addUserToPlaylist(response.data._id, $rootScope.user._id)
                                    .then(
                                        function (response) {
                                            $rootScope.user = response.data;
                                        }
                                    );
                            }
                        }
                        else {
                            PlaylistService.createPlaylist(playlist)
                                .then(
                                    function (response) {
                                        if (response.data) {
                                            PlaylistService.addUserToPlaylist(response.data._id, $rootScope.user._id)
                                                .then(
                                                    function (response) {
                                                        $rootScope.user = response.data;
                                                    }
                                                );
                                        }
                                    }
                                );
                        }
                    }
                );
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
    }
})();