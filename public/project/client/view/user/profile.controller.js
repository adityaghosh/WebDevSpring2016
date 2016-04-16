(function () {
    angular
        .module("MusicSocial")
        .controller("ProfileController", ProfileController);

    function ProfileController ($scope, $routeParams, UserService) {
        if($routeParams.userid) {
            $scope.updateProfile = updateProfile;
            $scope.connectSouncCloud = connectSouncCloud;


            function init() {
                UserService.findUserByUserId($routeParams.userid)
                    .then(
                        function (response) {
                            if (response.data != null){
                                UserService.setCurrentUser(response.data);
                                $scope.user = response.data;
                            }
                        }
                    );
            }

            init();

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

            function connectSouncCloud(user) {

            }


        }
    }
})();