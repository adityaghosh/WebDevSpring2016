(function (){
    angular
        .module("MusicSocial")
        .controller("MainController", MainController);

    function MainController ($scope, $location, $rootScope) {
        $scope = $rootScope;
        $scope.$location = $location;
        $scope.activeChat = activeChat;

        function activeChat() {
            $('.row-offcanvas').toggleClass('active');
        }
    }

})();