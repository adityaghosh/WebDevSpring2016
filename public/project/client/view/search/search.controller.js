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
                            PlaylistService.addUserToPlaylist(response.data._id, $rootScope.user._id)
                                .then(
                                    function (response) {
                                    }
                                );
                        }
                        else {
                            PlaylistService.createPlaylist(playlist)
                                .then(
                                    function (response) {
                                        if (response.data) {
                                            PlaylistService.addUserToPlaylist(response.data._id, $rootScope.user._id)
                                                .then(
                                                    function (response) {
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
            //$rootScope.currentPlaylist = playlist;
            /*SoundCloudService.getClientID()
                .then(
                    function (response) {
                        if (response.data != "null") {
                            SC.initialize({
                                client_id: response.data
                            });
                            SC.oEmbed(playlist.uri,
                                {
                                    auto_play: true,
                                    show_comments: false,
                                    maxwidth: 500,
                                    maxheight: 100
                                })
                                .then(function(oEmbed) {
                                    $scope.player = $sce.trustAsHtml(oEmbed.html);
                                    $scope.$apply();
                                });
                        }
                        else {
                            $scope.player = '<h2>Unable to load Player</h2>'
                        }
                    }
                );*/

        }

        /*if($routeParams.playlistName) {
            PlaylistService.findPlaylistByName($routeParams.playlistName)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            $scope.playlists = response.data;
                        }
                    }
                );
        }*/
    }
})();