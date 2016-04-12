(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var api = {
            findUserByUserName: findUserByUserName,
            findAllUsers: findAllUsers,
            findUserByUserId: findUserByUserId,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            updateUserAsAdmin: updateUserAsAdmin,
            setCurrentUser: setCurrentUser,
            login: login,
            register: register,
            logout: logout
        };

        return api;

        function login (user){
            return $http.post('/api/assignment/login', user);
        }

        function logout () {
            return $http.post('/api/assignment/logout')
        }

        function register (user) {
            return $http.post('/api/assignment/register', user);
        }

        function findUserByUserId(userId) {
            return $http.get('/api/assignment/admin/user/'+userId);
        }

        function updateUser(userId, user) {
            return $http.put('/api/assignment/user/'+userId, user);
        }

        function findAllUsers() {
            return $http.get('/api/assignment/admin/user');
        }

        function createUser(user) {
            return $http.post('/api/assignment/admin/user', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/assignment/admin/user/'+userId);
        }

        function updateUserAsAdmin(userId, user) {
            return $http.put('/api/assignment/admin/user/'+userId, user);
        }

        function findUserByUserName(username) {
            return $http.get('/api/assignment/user?username='+username);
        }

        // Helper function to set the rootScope user to the current user.
        function setCurrentUser(user) {
            $rootScope.currentUser = user;
            $rootScope.loggedIn = true;
        }
    }
})();