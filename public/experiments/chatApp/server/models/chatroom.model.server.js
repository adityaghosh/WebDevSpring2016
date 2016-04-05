
var rooms = require("./chatRooms.json");
var uuid = require("node-uuid");
module.exports = function () {

    var api = {
        findAllRooms: findAllRooms,
        createRoom: createRoom,
        joinRoomByRoomId: joinRoomByRoomId
    };

    return api;

    function findAllRooms() {
        return rooms;
    }

    function createRoom(room) {
        var newRoom = {
            _id : uuid.v1(),
            roomname: room.roomname,
            count: 0
        };
        rooms.push(newRoom);
        return newRoom;
    }

    function joinRoomByRoomId(roomid, user) {
        for (var i in rooms) {
            if (rooms[i]._id == roomid) {
                rooms[i].count = rooms[i].count + 1;
                return rooms[i];
            }
        }
        return null;
    }
};