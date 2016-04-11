(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService) {
        $scope.users = null;
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.selectUser = selectUser;
        $scope.removeUser = removeUser;

        var selectedUser = null;

        fillUserList();

        function fillUserList() {
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

        function addUser (user) {
            if (user) {
                if (user._id) {
                    alert("Cannot add the same user. Please try updating!");
                }
                else {
                    UserService
                        .createUser($scope.user)
                        .then(
                            function (response) {
                                if (response.data != "null") {
                                    $scope.user = null;
                                    fillUserList();
                                }
                            },
                            function (err) {
                                $rootScope.errorMessage = err;
                            }
                        );
                }
            }
            else {
                alert("Fields cannot be blank");
            }
        }

        function updateUser (user) {
            if (user) {
                if (user._id){
                    UserService
                        .updateUser(selectedUser._id, $scope.user)
                        .then(
                            function (response) {
                                if (response.data != "null") {
                                    $scope.user = null;
                                    fillUserList();
                                }
                            },
                            function (err) {
                                $rootScope.errorMessage = err;
                            }
                        );
                }
                else {
                    alert("Cannot update as user does not exist. Please try creating the user!");
                }
            }
            else {
                alert("Fields cannot be blank");
            }
        }


        function removeUser(index) {
            UserService.deleteUserById($scope.users[index]._id)
                .then(
                    function (response) {
                        fillUserList();
                    }
                );
        }

        function selectUser(index) {
            $scope.user = angular.copy($scope.users[index]);
            selectedUser = $scope.users[index];
        }

    }

})();