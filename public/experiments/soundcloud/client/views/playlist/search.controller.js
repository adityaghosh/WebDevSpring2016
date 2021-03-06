(function () {
    angular
        .module("mySoundCloud")
        .controller("PlaylistSearchController", PlaylistSearchController);

    function PlaylistSearchController($scope, SoundCloudService, $sce) {
        $scope.tracks = [];
        $scope.search = search;
        $scope.play = play;

        function search(query) {
            SoundCloudService.getPlaylists(query)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            $scope.tracks = response.data;
                        }
                        else {
                            $scope.playlists = [];
                        }
                    }
                );
        }

        function play(playlist) {
            SoundCloudService.getClientID()
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
                );

        }
    }

})();