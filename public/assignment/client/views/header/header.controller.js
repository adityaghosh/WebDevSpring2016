(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $scope, UserService) {
        $scope = $rootScope;
        $scope.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                    },
                    function (err) {
                        $rootScope.errorMessage = err;
                    }
                );

        }
    }

})();