(function () {
    angular
        .module("MusicSocial")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {
        $scope.passwordsdonotmatch = false;
        $scope.usernameexists = false;
        $scope.register = register;
        $scope.username = "";

        function register(user) {
            if (user.password == user.vpassword) {
                var newUser = {
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "username": user.username,
                    "password": user.password,
                    "email": user.email
                };
                var existingUser = null;
                UserService.findUserByUserName(newUser.username)
                    .then(
                        function (response) {
                            if (response.data != null){
                                existingUser = response;
                            }
                        }
                    );
                if (existingUser) {
                    $scope.usernameexists = true;
                }
                else {
                    UserService.createUser(newUser)
                        .then(
                            function(response) {
                                if (response.data != "null") {
                                    UserService.setCurrentUser(response.data);
                                    $scope.user = response.data;
                                    $location.path("profile/"+$scope.user.username);
                                }
                            }
                        );
                }
            }
            else {
                $scope.passwordsdonotmatch = true;
            }
        }

    }
})();