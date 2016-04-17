(function () {
    angular
        .module("MusicSocial")
        .controller("ProfileController", ProfileController);

    function ProfileController ($scope, $routeParams, UserService) {
        if($routeParams.userid) {
            $scope.updateProfile = updateProfile;

            function init() {
                UserService.findUserByUserId($routeParams.userid)
                    .then(
                        function (response) {
                            if (response.data != null){
                                UserService.setCurrentUser(response.data);
                                $scope.u = response.data;
                            }
                        }
                    );
            }

            init();

            function updateProfile(user) {
                UserService
                    .updateUser($scope.u._id,  user)
                    .then(
                        function (response) {
                            if (response.data != "null"){
                                UserService.setCurrentUser(response.data);
                                $scope.u = response.data;
                            }
                        }
                    );
            }
        }
    }
})();