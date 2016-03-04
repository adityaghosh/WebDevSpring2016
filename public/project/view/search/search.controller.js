(function () {
    angular
        .module("MusicSocial")
        .controller("SearchController", SearchController);

    function SearchController($scope, $routeParams, PlaylistService) {
        if($routeParams.playlistName) {
            PlaylistService.findPlaylistByName($routeParams.playlistName, function (response) {
                console.log(response);
                $scope.playlists = response;
                //$scope.playlists = $scope.playlists.playlists;
                //console.log($scope.playlists);
            });
        }


    }
})();