(function () {
    angular
        .module("MusicSocial")
        .controller("SearchController", SearchController);

    function SearchController($scope, $routeParams, $rootScope, PlaylistService, SoundCloudService) {
        $scope.playlists = [];
        $scope.play = play;


        function init() {
            if($routeParams.playlistName) {
                SoundCloudService.getPlaylists($routeParams.playlistName)
                    .then(
                        function (response) {
                            if (response.data != "null") {
                                $scope.playlists = response.data;
                            }
                            else {
                                $scope.playlists = [];
                            }
                        }
                    );
            }
        }
        init();
        function play(playlist) {
            $rootScope.currentPlaylist = playlist;
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