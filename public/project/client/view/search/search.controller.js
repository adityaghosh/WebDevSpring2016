(function () {
    angular
        .module("MusicSocial")
        .controller("SearchController", SearchController);

    function SearchController($scope, $routeParams, PlaylistService) {
        if($routeParams.playlistName) {
            PlaylistService.findPlaylistByName($routeParams.playlistName)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            $scope.playlists = response.data;
                        }
                    }
                );
        }
    }
})();