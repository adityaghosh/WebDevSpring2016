(function () {
    angular
        .module("MusicSocial")
        .controller("LoginController", LoginController);

    function LoginController ($scope, $location, UserService) {
        $scope.wrongpassword = false;
        $scope.login = login;
        function login(user) {
            if(user) {
                if(user.username && user.password) {
                    UserService
                        .login(user)
                        .then(
                            function (response) {
                                if (response.data != "null") {
                                    UserService.setCurrentUser(response.data);
                                    $location.path("#/");
                                }
                                else {
                                    $scope.wrongpassword = true;
                                }
                            },
                            function (err) {
                                $scope.wrongpassword = true;
                            }
                        );
                }
            }
        }
    }
})();