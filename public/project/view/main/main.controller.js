(function (){
    angular
        .module("MusicSocial")
        .controller("MainController", MainController);

    function MainController ($scope, $location) {

        $scope.$location = $location;
    }

})();