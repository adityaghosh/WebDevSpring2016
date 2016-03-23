(function () {
    angular
        .module("MusicSocial")
        .controller("ProfileController", ProfileController);

    function ProfileController ($rootScope, $scope, $location, $routeParams, UserService) {
        if($routeParams.username) {
            $scope.updateProfile = updateProfile;

            UserService.findUserByUserName($routeParams.username, function (response) {
                $scope.user = response;
            });

            function updateProfile(user) {
                UserService.updateUser(user.username,  $scope.user, function (response) {
                    $scope.user = response;
                });
            }
        }
    }
})();