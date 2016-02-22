(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController ($rootScope, $scope) {
        $scope = $rootScope;
        $scope.logout = logout;

        function logout() {
            $scope.loggedIn = false;
            $rootScope.user = null;
        }
    }

})();