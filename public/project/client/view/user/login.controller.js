(function () {
    angular
        .module("MusicSocial")
        .controller("LoginController", LoginController);

    function LoginController ($location, UserService) {
        var vm = this;
        vm.wrongpassword = false;
        vm.login = login;
        function login(user) {
            if(user) {
                if(user.username && user.password) {
                    UserService
                        .login(user)
                        .then(
                            function (response) {
                                if (response == null) {
                                    vm.wrongpassword = true;
                                }
                                else {
                                    if (response.data != "null") {
                                        UserService.setCurrentUser(response.data);
                                        $location.path("#/");
                                    }
                                    else {
                                        vm.wrongpassword = true;
                                    }
                                }

                            },
                            function (err) {
                                vm.wrongpassword = true;
                            }
                        );
                }
            }
        }
    }
})();