(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, $routeParams, UserService) {
        $scope.update = update;
        $scope.user = {
            "firstName":$rootScope.user.firstName,
            "lastName":$rootScope.user.lastName,
            "username":$rootScope.user.username,
            "password":$rootScope.user.password,
            "email":$rootScope.user.email
        };

        if($scope.user) {
            $location.url('/profile/'+$scope.user.username);
        }

        function update(user) {
            UserService.updateUser($routeParams.userid, user, function(response) {
                $rootScope.user = response;
            });
        }
    }
})();