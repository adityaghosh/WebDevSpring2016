(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService) {
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
                    "email": user.email,
                    "roles":[]
                };
                var existingUser = null;
                UserService
                    .findUserByUserName(newUser.username)
                    .then(
                        function (response) {
                            existingUser = response.data;
                        }
                    );
                if (existingUser) {
                    $scope.usernameexists = true;
                }
                else {
                    UserService
                        .createUser(newUser)
                        .then(
                            function(response) {
                                UserService.setCurrentUser(response.data);
                                $location.path("profile/"+response.data._id);
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