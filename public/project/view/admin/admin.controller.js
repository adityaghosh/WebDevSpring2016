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


        var selectedUser = null;

        UserService.findAllUsers(function (response) {
            $scope.users = response;
        });

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
            UserService.createUser(newUser, function (response) {
                $scope.u = null;
            });
            UserService.findAllUsers(function (response) {
                $scope.users = response;
            });
        }

        function updateUser() {
            if(selectedUser) {
                selectedUser.username = $scope.u.username;
                selectedUser.password = $scope.u.password;
                if ($scope.u.isAdmin && selectedUser.roles.indexOf('admin')< 0) {
                    selectedUser.roles.push('admin');
                }
                UserService.updateUser(selectedUser._id, selectedUser, function (response) {
                    $scope.u = null;
                });
            }
        }
        function removeUser(index) {
            UserService.deleteUserById($scope.users[index]._id, function (response) {
                $scope.users = response;
            });
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