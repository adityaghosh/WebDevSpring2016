(function () {
    angular
        .module("FormBuilderApp")
        .controller("MainController",mainController);

    function mainController($scope, $location) {
        // Adding location to the scope.
        $scope.$location = $location;
    }
})();