(function () {
    angular
        .module("MusicSocial")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var api = {
            findUserByCredentials: findUserByCredentials,
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
            logout: logout,
            findUserByUserIdAdmin: findUserByUserIdAdmin
        };

        return api;

        function login (user){
            return $http.post('/api/project/login', user);
        }

        function logout () {
            return $http.post('/api/project/logout');
        }

        function register (user) {
            return $http.post('/api/project/register', user);
        }

        function findUserByCredentials(username, password) {
            return $http.get('/api/project/user'+'?username='+username+'&password='+password);
        }

        function findUserByUserName(username) {
            return $http.get('/api/project/user?username='+username);
        }

        function findUserByUserIdAdmin(userId) {
            return $http.get('/api/project/admin/user/'+userId);
        }

        function findUserByUserId(userId) {
            return $http.get('/api/project/user/'+userId);
        }

        function findAllUsers() {
            return $http.get('/api/project/admin/user');
        }

        function createUser(user) {
            return $http.post('/api/project/admin/user', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/project/admin/user/'+userId);
        }

        function updateUser(userId, user) {
            return $http.put('/api/project/user/'+userId, user);
        }

        function updateUserAsAdmin(userId, user) {
            return $http.put('/api/project/admin/user/'+userId, user);
        }

        // Helper function to set the rootScope user to the current user.
        function setCurrentUser(user) {
            $rootScope.user = user;
            $rootScope.loggedIn = true;
        }
    }
})();