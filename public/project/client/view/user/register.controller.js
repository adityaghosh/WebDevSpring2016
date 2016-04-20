(function () {
    angular
        .module("MusicSocial")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.passwordsdonotmatch = false;
        vm.usernameexists = false;
        vm.register = register;
        vm.username = "";

        function register(user) {
            if (user.password == user.vpassword) {
                var newUser = {
                    "username": user.username,
                    "password": user.password,
                    "firstName":user.firstName,
                    "lastName":user.lastName,
                    "email": user.email
                };
                UserService
                    .findUserByUserName(newUser.username)
                    .then(
                        function (response) {
                            if (response == null){
                                vm.usernameexists = true;
                            }
                            else{
                                if (response.data != "null") {
                                    vm.usernameexists = true;
                                }
                                else {
                                    UserService
                                        .register(newUser)
                                        .then(
                                            function(response) {
                                                if (response.data != "null") {
                                                    UserService.setCurrentUser(response.data);
                                                    $location.path("profile/"+response.data._id);
                                                }
                                                else {
                                                    vm.user = null;
                                                    alert("Something went wrong! Please try again.");
                                                }
                                            }
                                        );
                                }
                            }
                        }
                    );
            }
            else {
                vm.passwordsdonotmatch = true;
            }
        }

    }
})();