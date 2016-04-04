(function () {
    angular
        .module("MusicSocial")
        .controller("MusicPlayerController", MusicPlayerController);

    function MusicPlayerController ($scope, $rootScope, PlaylistService, $sce) {
        $scope = $rootScope;
        $scope.showPlayer = false;

        $scope.$watch("currentPlaylist",function () {
             if ($scope.currentPlaylist) {
                 $scope.showPlayer = true;
                 PlaylistService.createPlayerWidget($scope.currentPlaylist)
                     .then(
                         function (response) {
                             if(response.data != "null") {
                                 $scope.player = safeSpotifyURL(response.data.replace(/"/g, ""));
                             }
                             else {
                                 $scope.player = "";
                             }
                         }
                     );
             }
            else {
                 $scope.showPlayer = false;
             }
        });

        function safeSpotifyURL(url) {
            if (url.length > 0) {
                return $sce.trustAsResourceUrl(url);
            }
            return "";
        }

    }
})();