(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserByUserName: findUserByUserName,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser
        };

        return api;

        function findUserByCredentials(username, password) {
            return $http.get('/api/assignment/user'+'?username='+username+'&password='+password);
        }

        function findUserByUserName(username) {
            return $http.get('/api/assignment/user?username='+username);
        }

        function findAllUsers() {
            return $http.get('/api/assignment/user');
        }

        function createUser(user) {
            return $http.post('/api/assignment/user', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/assignment/user/'+userId);
        }

        function updateUser(userId, user) {
            return $http.put('/api/assignment/user/'+userId, user);
        }

        // Helper function to set the rootScope user to the current user.
        function setCurrentUser(user) {
            $rootScope.user = user;
            $rootScope.loggedIn = true;
        }
    }
})();