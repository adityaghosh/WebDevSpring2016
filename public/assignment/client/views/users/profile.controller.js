(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, $routeParams, UserService) {
        $scope.update = update;
        $scope.user = {
            "_id": $rootScope.user._id,
            "firstName": $rootScope.user.firstName,
            "lastName": $rootScope.user.lastName,
            "username": $rootScope.user.username,
            "password": $rootScope.user.password,
            "email": $rootScope.user.email,
            "roles": $rootScope.user.roles
        };

        if($rootScope.user) {
            $location.url('/profile/'+$rootScope.user._id);
        }

        function update(user) {
            UserService
                .updateUser($routeParams.userid, user)
                .then(
                    function(response) {
                        console.log(response.data);
                        UserService.setCurrentUser(response.data);
                        $scope.user = response.data;
                    }
                );
        }
    }
})();