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
                    "emails": user.emails,
                    "roles":[]
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
                                    .createUser(newUser)
                                    .then(
                                        function(response) {
                                            if (response.data != "null") {
                                                UserService.setCurrentUser(response.data);
                                                $location.path("profile/"+response.data._id);
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