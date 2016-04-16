(function () {
    angular
        .module("MusicSocial")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $scope, $location, UserService) {
        $scope = $rootScope;
        $scope.user = $rootScope.user;
        $scope.logout = logout;
        $scope.closeHeader = closeHeader;

        function logout () {
            $('.row-offcanvas').removeClass('active');
            UserService
                .logout()
                .then(
                    function (response) {
                        $("#navbar").collapse("hide");
                        $rootScope.user = null;
                        $rootScope.currentPlaylist = null;
                        $location.url('/');
                    }
                );
        }
        function closeHeader() {
            $("#navbar").collapse("hide");
        }
    }

})();