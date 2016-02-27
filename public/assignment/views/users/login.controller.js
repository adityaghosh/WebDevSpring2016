(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController ($rootScope, $scope, $location, UserService) {
        $scope.wrongpassword = false;
        $scope.login = login;

        function login(user) {
            if(user) {
                UserService.findUserByCredentials(user.username, user.password, function(response) {
                    if (response != null) {
                        $rootScope.loggedIn = true;
                        $rootScope.user = response;
                        $location.path("profile/"+user.username);
                    }
                    else {
                        $scope.wrongpassword = true;
                    }
                });
            }
        }
    }
})();