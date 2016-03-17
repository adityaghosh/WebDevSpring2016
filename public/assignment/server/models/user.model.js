
var users = require("./user.mock.json");
module.exports = function (){

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUserName: findUserByUserName,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };

    return api;

    function findUserByCredentials(credentials) {
        console.log(users);
        var found = null;
        for (var i=0; i < users.length; i++) {
            if (users[i].username == credentials.username && users[i].password == credentials.password) {
                found = users[i];
                break;
            }
        }
        return found;
    }

    function findUserByUserName(username) {
        var found = null;
        for (var i=0; i < users.length; i++) {
            if (users[i].username == username) {
                found = users[i];
                break;
            }
        }
        return found;
    }

    function findUserById(id){
        for (u in users) {
            if(users[u]._id == id) {
                return users[u]
            }
        }
        return null;
    }

    function findAllUsers() {
        return users;
    }

    function createUser(user) {
        var newUser = {
            "_id":(new Date).getTime(),
            "firstName": user.firstName,
            "lastName": user.lastName,
            "username":user.username,
            "password": user.password,
            "email": user.email,
            "roles": user.roles
        };
        users.push(newUser);
        return newUser;
    }

    function deleteUserById(userId) {
        for (var i=0; i < users.length; i++) {
            if (users[i].username == userId) {
                users.splice(i,1);
                return true;
            }
        }
        return false;
    }

    function updateUser(userId, user) {
        var updatedUser = null;
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
        return updatedUser;
    }

};