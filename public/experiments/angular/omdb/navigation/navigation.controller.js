(function(){
    angular
        .module("MovieApp")
        .controller("NavController", navigationController);

    function navigationController($scope, $location){
        $scope.$location = $location;
    }
})();