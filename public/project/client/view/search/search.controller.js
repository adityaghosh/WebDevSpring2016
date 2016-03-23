(function () {
    angular
        .module("MusicSocial")
        .controller("SearchController", SearchController);

    function SearchController($scope, $routeParams, PlaylistService) {
        if($routeParams.playlistName) {
            PlaylistService.findPlaylistByName($routeParams.playlistName, function (response) {
                $scope.playlists = response;
            });
        }


    }
})();