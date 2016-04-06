(function () {
    angular
        .module("mySoundCloud")
        .controller("SearchController", SearchController);

    function SearchController($scope, SoundCloudService, $sce) {
        $scope.tracks = [];
        $scope.search = search;
        $scope.play = play;

        function search(query) {
            SoundCloudService.getTracks(query)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            $scope.tracks = response.data;
                        }
                        else {
                            $scope.tracks = [];
                        }
                    }
                );
        }

        function play(track) {
            SoundCloudService.getClientID()
                .then(
                    function (response) {
                        if (response.data != "null") {
                            SC.initialize({
                                client_id: response.data
                            });
                            var track_url = track.permalink_url;
                            SC.oEmbed(track.uri,
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