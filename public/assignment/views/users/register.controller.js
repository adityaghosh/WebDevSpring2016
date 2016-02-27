(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {
        $scope.passwordsdonotmatch = false;
        $scope.usernameexists = false;
        $scope.register = register;
        $scope.username = "";

        function register(user) {
            if (user.password == user.vpassword) {
                var newUser = {
                    "firstName": "",
                    "lastName": "",
                    "username": user.username,
                    "password": user.password,
                    "email": user.email
                };
                var existingUser = null;
                UserService.findUserByUserName(newUser.username, function (response) {
                    existingUser = response;
                });
                if (existingUser) {
                    $scope.usernameexists = true;
                }
                else {
                    UserService.createUser(newUser, function(response) {
                        $rootScope.user = response;
                        $rootScope.loggedIn = true;
                        $location.path("profile/"+response.username);
                    });
                }
            }
            else {
                $scope.passwordsdonotmatch = true;
            }
        }

    }
})();