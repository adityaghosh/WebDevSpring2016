(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController ($rootScope, $scope, $routeParams, UserService) {
        $scope.update = update;
        $scope.user = $rootScope.user;

        function update(user) {
            UserService.updateUser($routeParams.userid, user, function(response) {
            });
        }
    }
})();