(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, $routeParams, UserService) {
        $scope.update = update;
        $scope.user = {
            "_id": $rootScope.currentUser._id,
            "firstName": $rootScope.currentUser.firstName,
            "lastName": $rootScope.currentUser.lastName,
            "username": $rootScope.currentUser.username,
            "password": $rootScope.currentUser.password,
            "emails": $rootScope.currentUser.emails,
            "roles": $rootScope.currentUser.roles
        };

        if($rootScope.currentUser) {
            $location.url('/profile/'+$rootScope.currentUser.username);
        }

        function update(user) {
            UserService
                .updateUser($rootScope.currentUser._id, user)
                .then(
                    function(response) {
                        if (response.status == 200) {
                            UserService.findUserByUserName($routeParams.username)
                                .then(
                                    function (response) {
                                        if (response.data != "null") {
                                            UserService.setCurrentUser(response.data);
                                            $scope.user = response.data;
                                        }
                                    }
                                );
                        }
                        else {
                            alert("Something went wrong! Please try again.");
                        }
                    }
                );
        }
    }
})();