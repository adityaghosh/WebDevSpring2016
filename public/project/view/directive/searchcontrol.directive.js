(function () {
    angular
        .module("MusicSocial")
        .controller("SearchDirectiveController",SearchDirectiveController)
        .directive("searchControl", SearchControl);

    function SearchDirectiveController ($scope, $routeParams, $location) {
        $scope.searchClick = searchClick;

        if ($routeParams.playlistName) {
            $scope.playlistName = $routeParams.playlistName;
        }

        function searchClick(playlistName) {
            if (playlistName) {
                var path = '/search/'+playlistName;
                $location.url(path);
            }
        }
    }

    function SearchControl(){
       return {
            restrict: 'E',
            templateUrl: "view/directive/search.directive.html"
        };
    }
})();