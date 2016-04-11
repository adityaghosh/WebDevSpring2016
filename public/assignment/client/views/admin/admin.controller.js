(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService) {
        $scope.users = null;

        init();

        function init() {
            UserService
                .findAllUsers()
                .then(
                    function (response) {
                        if (response.data != "null") {
                            $scope.users = response.data;
                        }
                    },
                    function (err) {
                        $rootScope.errorMessage = err;
                    }
                );
        }

    }

})();