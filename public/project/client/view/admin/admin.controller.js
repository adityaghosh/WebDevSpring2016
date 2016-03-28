(function () {
    angular
        .module("MusicSocial")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, UserService){
        $scope.user = $rootScope.user;
        $scope.addUser = addUser;
        $scope.removeUser = removeUser;
        $scope.updateUser = updateUser;
        $scope.selectUser = selectUser;

        updateUserList();

        var selectedUser = null;

        function  updateUserList () {
            UserService.findAllUsers()
                .then(
                    function (response) {
                        if (response.data != "null") {
                            $scope.users = response.data;
                        }
                    }
                );
        }

        function addUser(user){
            var newUser = {
                "username": user.username,
                "password": user.password,
                "firstName": "",
                "lastName":"",
                "email": "",
                "roles": ['user']
            };
            if (user.isAdmin){
                newUser.roles.push('admin');
            }
            UserService.createUser(newUser)
                .then(
                    function (response) {
                        if (response.data != "null") {
                            $scope.u = null;
                        }
                    }
                );
            updateUserList();
        }

        function updateUser() {
            if(selectedUser) {
                selectedUser.username = $scope.u.username;
                selectedUser.password = $scope.u.password;
                if ($scope.u.isAdmin && selectedUser.roles.indexOf('admin')< 0) {
                    selectedUser.roles.push('admin');
                }
                UserService.updateUser(selectedUser._id, selectedUser)
                    .then(
                        function (response) {
                            if (response.data != "null") {
                                $scope.u = null;
                            }
                        }
                    );
                updateUserList();
            }
        }

        function removeUser(index) {
            UserService.deleteUserById($scope.users[index]._id)
                .then(
                    function (response) {
                        updateUserList();
                    }
                );

        }

        function selectUser(index) {
            var u = {
                'username' : $scope.users[index].username,
                'password' : $scope.users[index].password,
                'isAdmin' : ($scope.users[index].roles.indexOf('admin')>= 0)
            };
            $scope.u = u;
            selectedUser = $scope.users[index];
        }

    }
})();