(function () {
    angular
        .module("ChatApp")
        .factory("ChatService", ChatService);

    function ChatService ($http) {

        var api = {
            listRooms: listRooms,
            addRoom: addRoom,
            joinRoom: joinRoom
        };

        return api;

        function listRooms() {
            return $http.get('/api/experiments/chatapp/rooms');
        }

        function addRoom(room) {
            return $http.post('/api/experiments/chatapp/rooms',room);
        }

        function joinRoom(room, user) {
            return $http.post('/api/experiments/chatapp/rooms/'+room._id, user);
        }
    }
})();