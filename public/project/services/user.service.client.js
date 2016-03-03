(function () {
    angular
        .module("MusicSocial")
        .factory("UserService", UserService);

    function UserService() {
        var users =
            [
                {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["user"]		},
                {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "roles": ["user","admin"]},
                {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["user"]		},
                {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["user", "admin"]},
                {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": ["user"]		}
            ];


        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserByUserName: findUserByUserName,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;

        function findUserByCredentials(username, password, callback) {
            var found = null;
            for (var i=0; i < users.length; i++) {
                if (users[i].username == username && users[i].password == password) {
                    found = users[i];
                    break;
                }
            }
            callback(found);
        }

        function findUserByUserName(username, callback) {
            var found = null;
            for (var i=0; i < users.length; i++) {
                if (users[i].username == username) {
                    found = users[i];
                    break;
                }
            }
            callback(found);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            var newUser = {	"_id":(new Date).getTime(),
                "firstName": user.firstName,
                "lastName": user.lastName,
                "username":user.username,
                "password": user.password,
                "email": user.email,
                "roles": user.roles};
            users.push(newUser);
            callback(newUser);
        }

        function deleteUserById(userId, callback) {
            for (var i=0; i < users.length; i++) {
                if (users[i].username == userId) {
                    users.splice(i,1);
                    break;
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback) {
            var updatedUser = null;
            console.log(user);
            for (var i=0; i < users.length; i++) {
                if (users[i].username == userId) {
                    users[i].password = user.password;
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].email = user.email;
                    updatedUser = users[i];
                    break;
                }
            }
            console.log(updatedUser);
            callback(updatedUser);
        }
    }
})();