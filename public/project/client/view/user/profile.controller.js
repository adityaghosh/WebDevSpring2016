(function () {
    angular
        .module("MusicSocial")
        .controller("ProfileController", ProfileController);

    function ProfileController ($scope, $routeParams, UserService) {
        if($routeParams.username) {
            $scope.updateProfile = updateProfile;

            UserService.findUserByUserName($routeParams.username)
                .then(
                    function (response) {
                        if (response.data != null){
                            UserService.setCurrentUser(response.data);
                            $scope.user = response.data;
                        }
                    }
                );

            function updateProfile(user) {
                UserService.updateUser($scope.user._id,  $scope.user)
                    .then(
                        function (response) {
                            if (response.data != "null"){
                                UserService.setCurrentUser(response.data);
                                $scope.user = response.data;
                            }
                        }
                    );
            }
        }
    }
})();