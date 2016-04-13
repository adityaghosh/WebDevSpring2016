(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $scope, UserService) {
        $scope = $rootScope;
        $scope.logout = logout;
        $scope.closeHeader = closeHeader;

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $("#navbar").collapse("hide");
                    },
                    function (err) {
                        $rootScope.errorMessage = err;
                    }
                );

        }

        function closeHeader() {
            $("#navbar").collapse("hide");
        }
    }

})();