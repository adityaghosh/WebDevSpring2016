(function () {
    angular
        .module("MusicSocial")
        .controller("MusicPlayerController", MusicPlayerController);

    function MusicPlayerController ($scope, $rootScope, $sce, SoundCloudService) {
        $scope = $rootScope;
        $scope.showPlayer = false;

        $rootScope.$watch("currentPlaylist",function () {
            if ($rootScope.currentPlaylist) {
                $scope.showPlayer = true;
                SoundCloudService.getClientID()
                    .then(
                        function (response) {
                            if (response.data != "null") {
                                SC.initialize({
                                    client_id: response.data
                                });
                                SC.oEmbed($rootScope.currentPlaylist.uri,
                                    {
                                        auto_play: true,
                                        show_comments: false,
                                        maxwidth: 250,
                                        maxheight: 100
                                    })
                                    .then(function (oEmbed) {
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
            else {
                $scope.showPlayer = false;
            }
        });

    }
})();