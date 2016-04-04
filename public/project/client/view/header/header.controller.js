(function () {
    angular
        .module("MusicSocial")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $scope, $location) {
        $scope = $rootScope;
        $scope.user = $rootScope.user;
        $scope.logout = logout;

        function logout () {
            $scope.loggedIn = false;
            $rootScope.user = null;
            $rootScope.currentPlaylist = null;
            $location.url('/');
        }
    }

})();