(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController ($rootScope, $scope, $location, UserService) {
        $scope.register = register;
        $scope.username = "";

        function register(user){

            var newUser = {"firstName": "",
                            "lastName": "",
                            "username": user.username,
                            "password": user.password,
                            "email": user.email};
            UserService.createUser(newUser,function(response){
                $rootScope.user = response;
                $rootScope.loggedIn = true;
                $location.path("profile/"+response.username);
            });
        }

    }
})();