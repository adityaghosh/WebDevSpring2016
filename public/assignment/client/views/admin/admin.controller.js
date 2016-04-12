(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, UserService) {
        $scope.users = null;
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.selectUser = selectUser;
        $scope.removeUser = removeUser;

        $scope.sort = {
            column: "username",
            descending: ""
        };

        $scope.selectedClsDescending = function(column) {
            return column == $scope.sort.column && $scope.sort.descending == "-";
        };

        $scope.selectedClsAscending = function(column) {
            return column == $scope.sort.column && $scope.sort.descending == "";
        };

        $scope.changeSorting = function(column) {
            var sort = $scope.sort;
            if (sort.column == column) {
                if (sort.descending == "") {
                    sort.descending = "-";
                }
                else {
                    sort.descending = "";
                }
            } else {
                sort.column = column;
                sort.descending = "";
            }
        };

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
                    UserService
                        .createUser($scope.user)
                        .then(
                            function (response) {
                                if (response.data != "null") {
                                    $scope.user = null;
                                    fillUserList();
                                }
                                else {
                                    alert("Username already exists!");
                                }
                            },
                            function (err) {
                                $rootScope.errorMessage = err;
                            }
                        );
            }
            else {
                alert("Fields cannot be blank");
            }
        }

        function updateUser (user) {
            if (user) {
                if (user._id){
                    UserService
                        .updateUserAsAdmin(selectedUser._id, $scope.user)
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
                        $scope.user = null;
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