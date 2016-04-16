(function () {
    angular
        .module("MusicSocial")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, UserService) {
        $scope.users = null;
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.selectUser = selectUser;
        $scope.removeUser = removeUser;

        $scope.selectedClsDescending = function (column) {
            return column == $scope.sort.column && $scope.sort.descending == "-";
        };

        $scope.selectedClsAscending = function (column) {
            return column == $scope.sort.column && $scope.sort.descending == "";
        };

        $scope.changeSorting = function (column) {
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

            $scope.sort = {
                column: "username",
                descending: ""
            };
        }

        fillUserList();


        function addUser(user) {
            if (user) {
                var newUser = angular.copy(user);
                if (user.isAdmin) {
                    newUser.roles = "admin";
                    delete newUser.isAdmin;
                }
                else {
                    newUser.roles = "user";
                    delete newUser.isAdmin;
                }
                UserService
                    .createUser(newUser)
                    .then(
                        function (response) {
                            if (response.data != "null") {
                                $scope.t_user = null;
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

        function updateUser(user) {
            if (user) {
                var newUser = angular.copy(user);
                if (user.isAdmin) {
                    newUser.roles = "admin";
                    delete newUser.isAdmin;
                }
                else {
                    newUser.roles = "user"
                    delete newUser.isAdmin;
                }
                if (user._id) {
                    UserService
                        .updateUserAsAdmin(selectedUser._id, newUser)
                        .then(
                            function (response) {
                                if (response.data != "null") {
                                    $scope.t_user = null;
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


        function removeUser(user) {
            var i = $scope.users.indexOf(user);
            UserService.deleteUserById($scope.users[i]._id)
                .then(
                    function (response) {
                        $scope.user = null;
                        fillUserList();
                    }
                );
        }

        function selectUser(user) {
            var i = $scope.users.indexOf(user);
            $scope.t_user = angular.copy($scope.users[i]);
            if ($scope.users[i].roles.indexOf('admin') >=0 ) {
                $scope.t_user.isAdmin = true;
            }
            else {
                $scope.t_user.isAdmin = false;
            }
            selectedUser = $scope.users[i];
        }

    }
})();