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
                    "username": user.username,
                    "password": user.password,
                    "emails": user.emails
                };
                UserService
                    .findUserByUserName(newUser.username)
                    .then(
                        function (response) {
                            if (response.data != "null") {
                                $scope.usernameexists = true;
                            }
                            else {
                                UserService
                                    .register(newUser)
                                    .then(
                                        function(response) {
                                            if (response.data != "null") {
                                                UserService.setCurrentUser(response.data);
                                                $location.path("profile/"+response.data.username);
                                            }
                                            else {
                                                $scope.user = null;
                                                alert("Something went wrong! Please try again.");
                                            }
                                        }
                                    );
                            }
                        }
                    );
            }
            else {
                $scope.passwordsdonotmatch = true;
            }
        }

    }
})();