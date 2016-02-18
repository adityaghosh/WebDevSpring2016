(function(){
    angular
        .module("MovieApp")
        .controller("SearchController",searchController);

    function searchController($scope, $location, MovieService, $routeParams){
        console.log("searchController");
        $scope.search = search;
        $scope.title = $routeParams.title;

        if ($scope.title){
            search($scope.title);
        }

        function search(title){
            $location.url("/search/"+$scope.title);
            MovieService.findMovieByTitle(title,function(response){
                console.log(response);
                $scope.data = response;
            });
        }
    }
})();