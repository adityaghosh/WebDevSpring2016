(function () {
    angular
        .module("MusicSocial")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, UserService) {
        var vm =this;
        vm.users = null;
        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;
        vm.removeUser = removeUser;
        vm.currentPage = 0;
        vm.pageSize = 5;
        vm.nextPage = nextPage;
        vm.prevPage = prevPage;

        vm.selectedClsDescending = function (column) {
            return column == vm.sort.column && vm.sort.descending == "-";
        };

        vm.selectedClsAscending = function (column) {
            return column == vm.sort.column && vm.sort.descending == "";
        };

        vm.changeSorting = function (column) {
            var sort = vm.sort;
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

        function nextPage() {
            if(vm.currentPage < vm.numberOfPages - 1) {
                vm.currentPage = vm.currentPage + 1;
            }
        }

        function prevPage() {
            if(vm.currentPage > 0) {
                vm.currentPage = vm.currentPage - 1;
            }
        }

        function init() {
            UserService
                .findAllUsers()
                .then(
                    function (response) {
                        if (response.data != "null") {
                            vm.users = response.data;
                            vm.numberOfPages= vm.users.length/vm.pageSize;
                        }
                    },
                    function (err) {
                        $rootScope.errorMessage = err;
                    }
                );

            vm.sort = {
                column: "username",
                descending: ""
            };
        }

        init();


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
                                vm.t_user = null;
                                init();
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
                                    vm.t_user = null;
                                    init();
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
            var i = vm.users.indexOf(user);
            UserService.deleteUserById(vm.users[i]._id)
                .then(
                    function (response) {
                        vm.user = null;
                        init();
                    }
                );
        }

        function selectUser(user) {
            var i = vm.users.indexOf(user);
            vm.t_user = angular.copy(vm.users[i]);
            if (vm.users[i].roles.indexOf('admin') >=0 ) {
                vm.t_user.isAdmin = true;
            }
            else {
                vm.t_user.isAdmin = false;
            }
            selectedUser = vm.users[i];
        }

    }
})();