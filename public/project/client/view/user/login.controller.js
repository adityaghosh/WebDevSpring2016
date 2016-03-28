(function () {
    angular
        .module("MusicSocial")
        .controller("LoginController", LoginController);

    function LoginController ($scope, $location, UserService) {
        $scope.wrongpassword = false;
        $scope.login = login;
        function login(user) {
            if(user) {
                UserService.findUserByCredentials(user.username, user.password)
                    .then(
                        function(response) {
                            if (response.data != "null") {
                                UserService.setCurrentUser(response.data);
                                $location.path("profile/"+user.username);
                            }
                            else {
                                $scope.wrongpassword = true;
                            }
                        }
                    );
            }
        }
    }
})();